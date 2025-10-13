import * as DatabaseService from '@/shared/services/DatabaseService'
import * as StorageService from '@/shared/services/StorageService'

import { keywords, getCMSCorrelative } from '@/shared/utils/utils'


const storagePath = ({
    id = null,
    name,
}) => {
    return `/uploads/brands${id ? `/${id}` : ''}/${Date.now()}-${name}`
}

const list = ({
    source,
    filters,
    sorters,
    pageSize,
}) => {
    return DatabaseService.list({
        source,
        collectionName: 'brands',
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
        collectionName: 'brands',
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
                    id: 'brands',
                })

                const count = counterTx?.data 
                    ? counterTx.data.count + 1 
                    : 1

                const brandTx = await DatabaseService.getWithTransaction({
                    source,
                    tx,
                    collectionName: 'brands',
                })

                const correlative = getCMSCorrelative({ collectionName: 'brands', count })

                const brand = {
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
                    ref: brandTx.ref,
                    data: brand,
                })
                
                return { 
                    id: brandTx.ref.id,
                    ...brand, 
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
        collectionName: 'brands',
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
        collectionName: 'brands',
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