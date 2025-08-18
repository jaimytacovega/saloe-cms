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

export {
    list,
    get,
    add,
}