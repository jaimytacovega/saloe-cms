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

const useAdd = async ({
    source,
    data,
    filters,
    sorters,
    pageSize,
}) => {
    try{
        const addResult = await SubCategoryManager.add({ source, data })
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
        const updateResult = await SubCategoryManager.update({ source, data })
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