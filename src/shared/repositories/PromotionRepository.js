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
    const storageResult = await StorageService.add({
        source,
        file: data.image,
        path: storagePath({ name: data.image.name }),
    })

    if (storageResult?.err) return storageResult
    data.image = storageResult.data

    return DatabaseService.add({
        source,
        collectionName: 'promotions',
        data,
    })
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