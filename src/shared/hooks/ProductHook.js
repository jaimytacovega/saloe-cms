import { useQuery } from '@/shared/lib/@saloe-hook'

import * as ProductManager from '@/shared/managers/ProductManager'
import { ListProductArraySchema, ProductSchema } from '@/shared/schemas/ProductSchema'
import { listArgumentsToQueryString } from '@/shared/services/DatabaseService'


const useList = ({
    source,
    filters,
    sorters,
    pageSize,
    ttl,
}) => {
    return useQuery({
        queryKey: ['product', 'list', source, listArgumentsToQueryString({ filters, sorters, pageSize })],
        queryGroup: ['product', 'list', source],
        queryFn: () => ProductManager.list({ source, filters, sorters, pageSize }),
        querySchema: ListProductArraySchema,
        ttl,
    })
}

const useGet = ({
    source,
    id,
    ttl,
}) => {
    return useQuery({
        queryKey: ['product', 'get', source, id],
        queryFn: () => ProductManager.get({ source, id }),
        querySchema: ProductSchema,
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
        const addResult = await ProductManager.add({ source, data })
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
        const updateResult = await ProductManager.update({ source, data })
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
    technicalSheetPath,
    filters,
    sorters,
    pageSize,
}) => {
    try{
        const removeResult = await ProductManager.remove({ source, id, imagePath, technicalSheetPath })
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