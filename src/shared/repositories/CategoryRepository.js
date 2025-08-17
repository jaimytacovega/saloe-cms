import * as DatabaseService from '@/shared/services/DatabaseService'


const list = async ({
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

export {
    list,
}