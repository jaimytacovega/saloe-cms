import * as DatabaseService from '@/shared/services/DatabaseService'
import * as StorageService from '@/shared/services/StorageService'

import { keywords, getCMSCorrelative } from '@/shared/utils/utils'


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
                    filePath: storagePath({ name: data.image.name }),
                })
                if (imageStorageResult?.err) throw imageStorageResult.err

                const technicalSheetStorageResult = data?.technicalSheet 
                    ? await StorageService.add({
                        source,
                        file: data.technicalSheet,
                        filePath: storagePath({ name: data.technicalSheet.name }),
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

                const correlative = getCMSCorrelative({ collectionName: 'products', count })

                const product = {
                    ...data,
                    image: imageStorageResult.data,
                    technicalSheet: technicalSheetStorageResult.data,
                    count,
                    keywords: keywords({ 
                        keys: [
                            correlative,
                            data.name,
                            data.sku.substring(0, 4),
                            data.sku.substring(4),
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
            newFilePath: storagePath({ id: data.id, name: data.image.name }),
            currentFilePath: data.imagePath,
        })

        if (imageStorageResult?.err) return imageStorageResult
        data.image = imageStorageResult.data
    }

    delete data.imagePath

    if (Boolean(data.technicalSheetsToRemove)) {
        const technicalSheetsRemoveResult = await StorageService.removeMultiple({
            source,
            filePaths: data.technicalSheetsToRemove,
        })

        if (technicalSheetsRemoveResult?.err) return technicalSheetsRemoveResult
    }

    delete data.technicalSheetsToRemove

    const technicalSheets = data.technicalSheets ?? []
    const addTechnicalSheetsResult = await StorageService.addMultiple({
        source,
        files: technicalSheets,
        paths: technicalSheets.map((sheet) => storagePath({ id: data.id, name: sheet.name })),
    })
    if (addTechnicalSheetsResult?.err) return addTechnicalSheetsResult

    const mergedTechnicalSheets = [
        ...(data.technicalSheetsToKeep ?? []),
        ...(addTechnicalSheetsResult.data ?? []),
    ]

    delete data.technicalSheetsToKeep
    delete data.technicalSheets

    const finalSheet = mergedTechnicalSheets.length ? mergedTechnicalSheets.at(-1) : null
    const finalPath = finalSheet?.path
    const orphanPaths = mergedTechnicalSheets
        .map((sheet) => sheet.path)
        .filter((path) => path && path !== finalPath)

    if (orphanPaths.length > 0) {
        const orphanRemoveResult = await StorageService.removeMultiple({
            source,
            filePaths: orphanPaths,
        })
        if (orphanRemoveResult?.err) return orphanRemoveResult
    }

    data.technicalSheet = finalSheet ?? {}

    return DatabaseService.update({
        source,
        collectionName: 'products',
        data,
    })
}

const remove = async ({
    source,
    id,
    imagePath,
    technicalSheetPath,
}) => {
    const imageStorageResult = await StorageService.remove({
        source,
        filePath: imagePath,
    })

    if (imageStorageResult?.err) return imageStorageResult

    const technicalSheetStorageResult = !technicalSheetPath?.length
        ? {}
        : await StorageService.remove({
            source,
            filePath: technicalSheetPath,
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