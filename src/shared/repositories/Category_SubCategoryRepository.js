import * as DatabaseService from '@/shared/services/DatabaseService'


const list = ({
    source,
    filters,
    sorters,
    pageSize,
}) => {
    return DatabaseService.list({
        source,
        collectionName: 'category_subCategories',
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
        collectionName: 'category_subCategories',
        id,
    })
}

const remove = async ({
    source,
    id,
}) => {
    return DatabaseService.remove({
        source,
        collectionName: 'category_subCategories',
        id,
    })
}

export {
    list,
    get,
    remove,
}