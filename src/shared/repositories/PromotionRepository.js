import * as DatabaseService from '@/shared/services/DatabaseService'
import * as StorageService from '@/shared/services/StorageService'

import { keywords, getCMSCorrelative } from '@/shared/utils/utils'


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
                const imageStorageResult = await StorageService.add({
                    source,
                    file: data.image,
                    filePath: storagePath({ name: data.image.name }),
                })
                if (imageStorageResult?.err) throw imageStorageResult.err

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

                const correlative = getCMSCorrelative({ collectionName: 'promotions', count })

                const promotion = {
                    ...data,
                    image: imageStorageResult.data,
                    count,
                    keywords: keywords({ 
                        keys: [
                            correlative,
                            data.name,
                        ] 
                    }),
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
        const imageStorageResult = await StorageService.update({
            source,
            file: data.image,
            newFilePath: storagePath({ id: data.id, name: data.image.name }),
            currentFilePath: data.imagePath,
        })
    
        if (imageStorageResult?.err) return imageStorageResult
        data.image = imageStorageResult.data
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
    imagePath,
}) => {
    const imageStorageResult = await StorageService.remove({
        source,
        filePath: imagePath,
    })

    if (imageStorageResult?.err) return imageStorageResult

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