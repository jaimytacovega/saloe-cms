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

const useAdd = async ({
    source,
    data,
    filters,
    sorters,
    pageSize,
}) => {
    try{
        const addResult = await BrandManager.add({ source, data })
        if (addResult?.err) return addResult

        const [useGetRevalidate, useListRevalidate] = await Promise.allSettled([
            useGet({ source, id: addResult.data.id, ttl: 0 }),
            useList({ source, filters, sorters, pageSize, ttl: 0 }),
        ])  

        if (useGetRevalidate.status === 'rejected') throw useGetRevalidate.reason
        if (useListRevalidate.status === 'rejected') throw useListRevalidate.reason
        
        const useGetResult = useGetRevalidate.value
        const useListResult = useListRevalidate.value
        
        if (useGetResult?.err) throw useGetResult.err
        if (useListResult?.err) throw useListResult.err

        return addResult
    }catch(err){
        console.error(err)
        return { err }
    }
}

const useUpdate = async ({
    source,
    data,
    filters,
    sorters,
    pageSize,
}) => {
    try{
        const updateResult = await BrandManager.update({ source, data })
        if (updateResult?.err) return updateResult

        const [useGetRevalidate, useListRevalidate] = await Promise.allSettled([
            useGet({ source, id: data.id, ttl: 0 }),
            useList({ source, filters, sorters, pageSize, ttl: 0 }),
        ])  

        if (useGetRevalidate.status === 'rejected') throw useGetRevalidate.reason
        if (useListRevalidate.status === 'rejected') throw useListRevalidate.reason
        
        const useGetResult = useGetRevalidate.value
        const useListResult = useListRevalidate.value
        
        if (useGetResult?.err) throw useGetResult.err
        if (useListResult?.err) throw useListResult.err
        
        return updateResult
    }catch(err){
        console.error(err)
        return { err }
    }
}

export {
    useList,
    useGet,
    useAdd,
    useUpdate,
}