import * as DatabaseService from '@/shared/services/DatabaseService'
import * as StorageService from '@/shared/services/StorageService'


const storagePath = ({
    id = null,
    name,
}) => {
    return `/uploads/subCategories${id ? `/${id}` : ''}/${Date.now()}-${name}`
}

const list = ({
    source,
    filters,
    sorters,
    pageSize,
}) => {
    return DatabaseService.list({
        source,
        collectionName: 'subCategories',
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
        collectionName: 'subCategories',
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
                    id: 'subCategories',
                })

                const count = counterTx?.data 
                    ? counterTx.data.count + 1 
                    : 1

                const subCategoryTx = await DatabaseService.getWithTransaction({
                    source,
                    tx,
                    collectionName: 'subCategories',
                })

                const subCategory = {
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
                    ref: subCategoryTx.ref,
                    data: subCategory,
                })
                
                return { 
                    id: subCategoryTx.ref.id,
                    ...subCategory, 
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
            oldPath: data.oldPath,
        })
    
        if (storageResult?.err) return storageResult
        data.image = storageResult.data
    }
    
    delete data.oldPath

    return DatabaseService.update({
        source,
        collectionName: 'subCategories',
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
        collectionName: 'subCategories',
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