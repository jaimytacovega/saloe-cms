import * as DatabaseService from '@/shared/services/DatabaseService'
import * as StorageService from '@/shared/services/StorageService'


const storagePath = ({
    id = null,
    name,
}) => {
    return `/uploads/products${id ? `/${id}` : ''}/${Date.now()}-${name}`
}

const list = ({
    source,
    filters,
    sorters,
    pageSize,
}) => {
    return DatabaseService.list({
        source,
        collectionName: 'products',
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
        collectionName: 'products',
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
            try {
                const imageStorageResult = await StorageService.add({
                    source,
                    file: data.image,
                    path: storagePath({ name: data.image.name }),
                })
                if (imageStorageResult?.err) throw imageStorageResult.err

                const technicalSheetStorageResult = data?.technicalSheet 
                    ? await StorageService.add({
                        source,
                        file: data.technicalSheet,
                        path: storagePath({ name: data.technicalSheet.name }),
                    }) : { data: {} }
                if (technicalSheetStorageResult?.err) throw technicalSheetStorageResult.err

                const counterTx = await DatabaseService.getWithTransaction({
                    source,
                    tx,
                    collectionName: 'counters',
                    id: 'products',
                })

                const count = counterTx?.data
                    ? counterTx.data.count + 1
                    : 1

                const productTx = await DatabaseService.getWithTransaction({
                    source,
                    tx,
                    collectionName: 'products',
                })

                const product = {
                    ...data,
                    image: imageStorageResult.data,
                    technicalSheet: technicalSheetStorageResult.data,
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
                    ref: productTx.ref,
                    data: product,
                })

                return {
                    id: productTx.ref.id,
                    ...product,
                }
            } catch (err) {
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
            imagePath: data.imagePath,
        })

        if (imageStorageResult?.err) return imageStorageResult
        data.image = imageStorageResult.data
    }

    delete data.imagePath

    if (Boolean(data.technicalSheet)) {
        const technicalSheetStorageResult = await StorageService.update({
            source,
            file: data.technicalSheet,
            path: storagePath({ id: data.id, name: data.technicalSheet.name }),
            imagePath: data.technicalSheetPath,
        })

        if (technicalSheetStorageResult?.err) return technicalSheetStorageResult
        data.technicalSheet = technicalSheetStorageResult.data
    }

    delete data.technicalSheetPath

    return DatabaseService.update({
        source,
        collectionName: 'products',
        data,
    })
}

const remove = async ({
    source,
    id,
    path,
    technicalSheetPath,
}) => {
    const imageStorageResult = await StorageService.remove({
        source,
        path,
    })

    if (imageStorageResult?.err) return imageStorageResult

    const technicalSheetStorageResult = await StorageService.remove({
        source,
        path: technicalSheetPath,
    })

    if (technicalSheetStorageResult?.err) return technicalSheetStorageResult

    return DatabaseService.remove({
        source,
        collectionName: 'products',
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