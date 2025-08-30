import { useQuery } from '@/shared/lib/@saloe-hook'

import * as BrandManager from '@/shared/managers/BrandManager'
import { ListBrandArraySchema, BrandSchema } from '@/shared/schemas/BrandSchema'
import { listArgumentsToQueryString } from '@/shared/services/DatabaseService'


const useList = ({
    source,
    filters,
    sorters,
    pageSize,
    ttl,
}) => {
    return useQuery({
        queryKey: ['brand', 'list', source, listArgumentsToQueryString({ filters, sorters, pageSize })],
        queryGroup: ['brand', 'list', source],
        queryFn: () => BrandManager.list({ source, filters, sorters, pageSize }),
        querySchema: ListBrandArraySchema,
        ttl,
    })
}

const useGet = ({
    source,
    id,
    ttl,
}) => {
    return useQuery({
        queryKey: ['brand', 'get', source, id],
        queryFn: () => BrandManager.get({ source, id }),
        querySchema: BrandSchema,
        ttl,
    })
}

const useUpdate = async ({
    source,
    data,
}) => {
    const updateResult = await BrandManager.update({ source, data })
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