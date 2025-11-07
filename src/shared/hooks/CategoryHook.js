import { useQuery } from '@/shared/lib/@saloe-hook'

import * as CategoryManager from '@/shared/managers/CategoryManager'
import { ListCategoryArraySchema, CategorySchema } from '@/shared/schemas/CategorySchema'
import { listArgumentsToQueryString } from '@/shared/services/DatabaseService'


const useList = ({
    source,
    filters,
    sorters,
    pageSize,
    ttl,
}) => {
    return useQuery({
        queryKey: ['category', 'list', source, listArgumentsToQueryString({ filters, sorters, pageSize })],
        queryGroup: ['category', 'list', source],
        queryFn: () => CategoryManager.list({ source, filters, sorters, pageSize }),
        querySchema: ListCategoryArraySchema,
        ttl,
    })
}

const useGet = ({
    source,
    id,
    ttl,
}) => {
    return useQuery({
        queryKey: ['category', 'get', source, id],
        queryFn: () => CategoryManager.get({ source, id }),
        querySchema: CategorySchema,
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
        const addResult = await CategoryManager.add({ source, data })
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
        const updateResult = await CategoryManager.update({ source, data })
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

const useRemove = async ({
    source,
    id,
    imagePath,
    catalogPaths,
    filters,
    sorters,
    pageSize,
}) => {
    try{
        const removeResult = await CategoryManager.remove({ source, id, imagePath, catalogPaths })
        if (removeResult?.err) return removeResult

        const [useListRevalidate] = await Promise.allSettled([
            useList({ source, filters, sorters, pageSize, ttl: 0 }),
        ])  

        if (useListRevalidate.status === 'rejected') throw useListRevalidate.reason

        const useListResult = useListRevalidate.value
        
        if (useListResult?.err) throw useListResult.err

        return removeResult
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
    useRemove,
}