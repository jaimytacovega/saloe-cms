import { useQuery } from '@/shared/lib/@saloe-hook'

import * as QuotationManager from '@/shared/managers/QuotationManager'
import { ListQuotationArraySchema, QuotationSchema } from '@/shared/schemas/QuotationSchema'
import { listArgumentsToQueryString } from '@/shared/services/DatabaseService'


const useList = ({
    source,
    filters,
    sorters,
    pageSize,
    ttl,
}) => {
    return useQuery({
        queryKey: ['quotation', 'list', source, listArgumentsToQueryString({ filters, sorters, pageSize })],
        queryGroup: ['quotation', 'list', source],
        queryFn: () => QuotationManager.list({ source, filters, sorters, pageSize }),
        querySchema: ListQuotationArraySchema,
        ttl,
    })
}

const useGet = ({
    source,
    id,
    ttl,
}) => {
    return useQuery({
        queryKey: ['quotation', 'get', source, id],
        queryFn: () => QuotationManager.get({ source, id }),
        querySchema: QuotationSchema,
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
        const addResult = await QuotationManager.add({ source, data })
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
        const updateResult = await QuotationManager.update({ source, data })
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
    attachmentPaths,
    filters,
    sorters,
    pageSize,
}) => {
    try{
        const removeResult = await QuotationManager.remove({ source, id, attachmentPaths })
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