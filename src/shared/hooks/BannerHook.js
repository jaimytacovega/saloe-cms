import { useQuery } from '@/shared/lib/@saloe-hook'

import * as BannerManager from '@/shared/managers/BannerManager'
import { ListBannerArraySchema, BannerSchema } from '@/shared/schemas/BannerSchema'
import { listArgumentsToQueryString } from '@/shared/services/DatabaseService'


const useList = ({
    source,
    filters,
    sorters,
    pageSize,
    ttl,
}) => {
    return useQuery({
        queryKey: ['banner', 'list', source, listArgumentsToQueryString({ filters, sorters, pageSize })],
        queryGroup: ['banner', 'list', source],
        queryFn: () => BannerManager.list({ source, filters, sorters, pageSize }),
        querySchema: ListBannerArraySchema,
        ttl,
    })
}

const useGet = ({
    source,
    id,
    ttl,
}) => {
    return useQuery({
        queryKey: ['banner', 'get', source, id],
        queryFn: () => BannerManager.get({ source, id }),
        querySchema: BannerSchema,
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
    try {
        const addResult = await BannerManager.add({ source, data })
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
    } catch (err) {
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
    try {
        const updateResult = await BannerManager.update({ source, data })
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
    } catch (err) {
        console.error(err)
        return { err }
    }
}

const useRemove = async ({
    source,
    id,
    imagePath,
    filters,
    sorters,
    pageSize,
}) => {
    try {
        const removeResult = await BannerManager.remove({ source, id, imagePath })
        if (removeResult?.err) return removeResult

        const [useListRevalidate] = await Promise.allSettled([
            useList({ source, filters, sorters, pageSize, ttl: 0 }),
        ])

        if (useListRevalidate.status === 'rejected') throw useListRevalidate.reason

        const useListResult = useListRevalidate.value

        if (useListResult?.err) throw useListResult.err

        return removeResult
    } catch (err) {
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
