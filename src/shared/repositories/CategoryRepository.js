import * as DatabaseService from '@/shared/services/DatabaseService'


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

const add = ({
    source,
    data,
}) => {
    return DatabaseService.add({
        source,
        collectionName: 'categories',
        data,
    })
}

const update = ({
    source,
    data,
}) => {
    return DatabaseService.update({
        source,
        collectionName: 'categories',
        data,
    })
}

const remove = ({
    source,
    id,
}) => {
    return DatabaseService.remove({
        source,
        collectionName: 'categories',
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