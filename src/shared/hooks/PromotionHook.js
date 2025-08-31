import { useQuery } from '@/shared/lib/@saloe-hook'

import * as PromotionManager from '@/shared/managers/PromotionManager'
import { ListPromotionArraySchema, PromotionSchema } from '@/shared/schemas/PromotionSchema'
import { listArgumentsToQueryString } from '@/shared/services/DatabaseService'


const useList = ({
    source,
    filters,
    sorters,
    pageSize,
    ttl,
}) => {
    return useQuery({
        queryKey: ['promotion', 'list', source, listArgumentsToQueryString({ filters, sorters, pageSize })],
        queryGroup: ['promotion', 'list', source],
        queryFn: () => PromotionManager.list({ source, filters, sorters, pageSize }),
        querySchema: ListPromotionArraySchema,
        ttl,
    })
}

const useGet = ({
    source,
    id,
    ttl,
}) => {
    return useQuery({
        queryKey: ['promotion', 'get', source, id],
        queryFn: () => PromotionManager.get({ source, id }),
        querySchema: PromotionSchema,
        ttl,
    })
}

const useUpdate = async ({
    source,
    data,
}) => {
    const updateResult = await PromotionManager.update({ source, data })
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