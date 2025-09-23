import * as DatabaseService from '@/shared/services/DatabaseService'
import * as StorageService from '@/shared/services/StorageService'


const storagePath = ({
    id = null,
    name,
}) => {
    return `/uploads/categories${id ? `/${id}` : ''}/${Date.now()}-${name}`
}

const list = ({
    source,
    filters,
    sorters,
    pageSize,
}) => {
    return DatabaseService.list({
        source,
        collectionName: 'categories',
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
        collectionName: 'categories',
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
                    path: storagePath({ name: data.image.name }),
                })
                if (imageStorageResult?.err) throw imageStorageResult.err
                
                const catalogsStorageResults = await StorageService.addMultiple({
                    source,
                    files: data.catalogs,
                    paths: data.catalogs.map((catalog) => storagePath({ name: catalog.name })),
                })
                if (catalogsStorageResults?.err) throw catalogsStorageResults.err

                const counterTx = await DatabaseService.getWithTransaction({
                    source,
                    tx,
                    collectionName: 'counters',
                    id: 'categories',
                })

                const count = counterTx?.data 
                    ? counterTx.data.count + 1 
                    : 1

                const categoryTx = await DatabaseService.getWithTransaction({
                    source,
                    tx,
                    collectionName: 'categories',
                })

                const category = {
                    ...data,
                    image: imageStorageResult.data,
                    catalogs: catalogsStorageResults.data,
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
                    ref: categoryTx.ref,
                    data: category,
                })
                
                return { 
                    id: categoryTx.ref.id,
                    ...category, 
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
            path: storagePath({ id: data.id, name: data.image.name }),
            oldPath: data.oldPath,
        })
    
        if (imageStorageResult?.err) return imageStorageResult
        data.image = imageStorageResult.data
    }
    
    delete data.oldPath

    if (Boolean(data.catalogsToRemove)) {
        const catalogsStorageResults = await StorageService.removeMultiple({
            source,
            paths: data.catalogsToRemove,
        })

        if (catalogsStorageResults?.err) return catalogsStorageResults
    }

    delete data.catalogsToRemove

    const addCatalogsStorageResults = await StorageService.addMultiple({
        source,
        files: data.catalogs,
        paths: data.catalogs.map((catalog) => storagePath({ name: catalog.name })),
    })
    if (addCatalogsStorageResults?.err) return addCatalogsStorageResults

    data.catalogs = [
        ...data.catalogsToKeep,
        ...addCatalogsStorageResults.data,
    ]

    delete data.catalogsToKeep

    return DatabaseService.update({
        source,
        collectionName: 'categories',
        data,
    })
}

const remove = async ({
    source,
    id,
    path,
    catalogPaths,
}) => {
    const removeFilesResults = await StorageService.removeMultiple({
        source,
        paths: [path, ...catalogPaths],
    })

    if (removeFilesResults?.err) return removeFilesResults

    return DatabaseService.remove({
        source,
        collectionName: 'categories',
        id,
    })
}

const incrementCounter = ({
    source,
    id,
    count,
}) => {
    return DatabaseService.incrementCounter({
        source,
        collectionName: 'categories',
        id,
        count,
    })
}

export {
    list,
    get,
    add,
    update,
    remove,

    incrementCounter,
}