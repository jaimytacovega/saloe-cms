import { useQuery } from '@/shared/lib/@saloe-hook'

import * as SubCategoryManager from '@/shared/managers/SubCategoryManager'
import { ListSubCategoryArraySchema, SubCategorySchema } from '@/shared/schemas/SubCategorySchema'
import { listArgumentsToQueryString } from '@/shared/services/DatabaseService'


const useList = ({
    source,
    filters,
    sorters,
    pageSize,
    ttl,
}) => {
    return useQuery({
        queryKey: ['subCategory', 'list', source, listArgumentsToQueryString({ filters, sorters, pageSize })],
        queryGroup: ['subCategory', 'list', source],
        queryFn: () => SubCategoryManager.list({ source, filters, sorters, pageSize }),
        querySchema: ListSubCategoryArraySchema,
        ttl,
    })
}

const useGet = ({
    source,
    id,
    ttl,
}) => {
    return useQuery({
        queryKey: ['subCategory', 'get', source, id],
        queryFn: () => SubCategoryManager.get({ source, id }),
        querySchema: SubCategorySchema,
        ttl,
    })
}

const useUpdate = async ({
    source,
    data,
}) => {
    const updateResult = await SubCategoryManager.update({ source, data })
    if (updateResult?.err) return updateResult

    const useGetResult = await useGet({ source, id: data.id, ttl: 0 })
    if (useGetResult?.err) return useGetResult
    
    return updateResult
}

export {
    useList,
    useGet,
    useUpdate,
}