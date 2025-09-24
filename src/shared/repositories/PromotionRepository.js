import * as DatabaseService from '@/shared/services/DatabaseService'
import * as StorageService from '@/shared/services/StorageService'


const storagePath = ({
    id = null,
    name,
}) => {
    return `/uploads/promotions${id ? `/${id}` : ''}/${Date.now()}-${name}`
}

const list = ({
    source,
    filters,
    sorters,
    pageSize,
}) => {
    return DatabaseService.list({
        source,
        collectionName: 'promotions',
        filters,
        sorters,
        pageSize,
    })
}

const get = ({
    source,
    id,
}) => {
    return DatabaseService.get({
        source,
        collectionName: 'promotions',
        id,
    })
}

const add = async ({
    source,
    data,
}) => {
    const addResult = await DatabaseService.onTransaction({
        source,
        transaction: async (tx) => {
            try{
                const storageResult = await StorageService.add({
                    source,
                    file: data.image,
                    path: storagePath({ name: data.image.name }),
                })
                if (storageResult?.err) throw storageResult.err

                const counterTx = await DatabaseService.getWithTransaction({
                    source,
                    tx,
                    collectionName: 'counters',
                    id: 'promotions',
                })

                const count = counterTx?.data 
                    ? counterTx.data.count + 1 
                    : 1

                const brandTx = await DatabaseService.getWithTransaction({
                    source,
                    tx,
                    collectionName: 'brands',
                    id: data.brandId,
                })
                
                if (!Boolean(brandTx?.data)) throw 'brand not found'

                const promotionTx = await DatabaseService.getWithTransaction({
                    source,
                    tx,
                    collectionName: 'promotions',
                })

                const promotion = {
                    ...data,
                    image: storageResult.data,
                    count,
                }

                Boolean(counterTx?.data)
                    ? await DatabaseService.updateWithTransaction({
                        source,
                        tx,
                        ref: counterTx.ref,
                        data: { count },
                    })
                    : await DatabaseService.addWithTransaction({
                        source,
                        tx,
                        ref: counterTx.ref,
                        data: { count },
                    })

                await DatabaseService.addWithTransaction({
                    source,
                    tx,
                    ref: promotionTx.ref,
                    data: promotion,
                })
                
                return { 
                    id: promotionTx.ref.id,
                    ...promotion, 
                }
            }catch(err){
                return Promise.reject(err)
            }
        }
    })

    return addResult
}

const update = async({
    source,
    data,
}) => {
    if (Boolean(data.image)) {
        const storageResult = await StorageService.update({
            source,
            file: data.image,
            path: storagePath({ id: data.id, name: data.image.name }),
            imagePath: data.imagePath,
        })
    
        if (storageResult?.err) return storageResult
        data.image = storageResult.data
    }
    
    delete data.imagePath

    return DatabaseService.update({
        source,
        collectionName: 'promotions',
        data,
    })
}

const remove = async ({
    source,
    id,
    path,
}) => {
    const storageResult = await StorageService.remove({
        source,
        path,
    })

    if (storageResult?.err) return storageResult

    return DatabaseService.remove({
        source,
        collectionName: 'promotions',
        id,
    })
}

export {
    list,
    get,
    add,
    update,
    remove,
}