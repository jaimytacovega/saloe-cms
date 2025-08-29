import { isCloudflareWorker } from 'saloe/util'
import { getContext } from '@/shared/lib/@saloe-context/index'
import { prettifyError } from '@/shared/schemas/utils/utils'


const CACHE_NAME = 'HOOKS_DEV'

const transformQueryKey = ({ queryKey }) => {
    if (Array.isArray(queryKey)) return queryKey.join('-')
    return queryKey
}

const getCacheAsServiceWorker = async ({ cacheUrl }) => {
    try{
        const request = getContext({ key: 'request' })
        if (!request) throw 'request-not-found'

        const origin = (new URL(request.url)).origin
        const kvGetUrl = `${origin}/~/kv/getter`

        const kvGetResponse = await fetch(kvGetUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                key: cacheUrl,
                store: CACHE_NAME,
            }),
        })

        if (!kvGetResponse.ok) return { err: 'kv-get-failed' }

        const kvGetJson = await kvGetResponse.json()
        if (kvGetJson?.err) throw kvGetJson.err

        return { data: JSON.parse(kvGetJson.data) }
    }catch(err){
        console.error(err)
        return { err }
    }
}

const setCacheAsServiceWorker = async ({ cacheUrl, data }) => {
    try{
        const request = getContext({ key: 'request' })
        if (!request) throw 'request-not-found'

        const origin = (new URL(request.url)).origin
        const kvSetUrl = `${origin}/~/kv/setter`

        const timestamp = Date.now()
        
        const kvSetResponse = await fetch(kvSetUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                key: cacheUrl,
                data: { data, timestamp },
                store: CACHE_NAME,
            }),
        })

        if (!kvSetResponse.ok) throw kvSetResponse

        return { data, timestamp }
    }catch(err){
        console.error(err)
        return { err }
    }
}

const getCacheAsCloudflareWorker = async ({ cacheUrl }) => {
    try{
        const env = getContext({ key: 'env' })
        if (!env) throw 'env-not-found'

        const { getFromKV } = await import('saloe/cloudflare-kv')

        const getFromKVResult = await getFromKV({
            env,
            kv: CACHE_NAME,
            key: cacheUrl,
        })

        if (getFromKVResult?.err) throw getFromKVResult.err

        return { data: JSON.parse(getFromKVResult.data) }
    }catch(err){
        console.error(err)
        return { err }
    }
}

const setCacheAsCloudflareWorker = async ({ cacheUrl, data }) => {
    try{
        const env = getContext({ key: 'env' })
        if (!env) throw 'env-not-found'

        const { putInKV } = await import('saloe/cloudflare-kv')
        const timestamp = Date.now()

        const putInKvResult = await putInKV({
            env,
            kv: CACHE_NAME,
            key: cacheUrl,
            data: JSON.stringify({ data, timestamp }),
        })

        if (putInKvResult?.err) throw putInKvResult.err 

        return { data, timestamp }
    }catch(err){
        console.error(err)
        return { err }
    }
}

const useGetCache = async ({ queryKey }) => {
    const env = getContext({ key: 'env' })
    if (!env) throw 'env-not-found'

    const getCacheFn = isCloudflareWorker({ env }) 
        ? getCacheAsCloudflareWorker 
        : getCacheAsServiceWorker

    const cacheUrl = useGetCacheUrl({ queryKey })
    return getCacheFn({ cacheUrl })
}

const useSetCache = async ({ queryKey, data }) => {
    const env = getContext({ key: 'env' })
    if (!env) throw 'env-not-found'
    
    const setCacheFn = isCloudflareWorker({ env }) 
        ? setCacheAsCloudflareWorker 
        : setCacheAsServiceWorker

    const cacheUrl = useGetCacheUrl({ queryKey })
    return setCacheFn({ cacheUrl, data })
}

const useGetCacheUrl = ({ queryKey }) => {
    const cacheKey = transformQueryKey({ queryKey })
    return `~/hooks/${cacheKey}`
}

const QUERIES_BY_KEY = new Map()
const QUERIES_BY_GROUP = new Map()

const configRevalidate = ({
    queryKey,
    queryGroup,
    queryFn,
    querySchema,
}) => {
    QUERIES_BY_KEY.set(queryKey, ({ ttl }) => {
        return useQuery({ 
            queryKey, 
            queryGroup,
            queryFn, 
            querySchema, 
            ttl: ttl, 
        })
    })

    if (queryGroup){
        QUERIES_BY_GROUP.set(queryGroup, ({ ttl }) => {
            return useQuery({ 
                queryKey, 
                queryGroup,
                queryFn, 
                querySchema, 
                ttl: ttl, 
            })
        })
    }
}

const useRevalidate = async ({ 
    queryKey, 
    queryGroup, 
    queryKeys,
    queryGroups,
}) => {
    if (queryKey){
        const query = QUERIES_BY_KEY.get(queryKey)
        if (query) return query({ ttl: 0 })
    }

    if (queryGroup){
        const query = QUERIES_BY_GROUP.get(queryGroup)
        if (query) return query({ ttl: 0 })
    }

    if (queryKeys || queryGroups){
        try{
            const revalidateResults = await Promise.allSettled(
                [
                    ...(queryKeys ?? []).map((queryKey) => {
                        return useRevalidate({ queryKey })
                    }),
                    ...(queryGroups ?? []).map((queryGroup) => {
                        return useRevalidate({ queryGroup })
                    }),
                ]
            )

            const rejectedRevalidateResults = revalidateResults.filter((revalidateResult) => revalidateResult.status === 'rejected')
            if (rejectedRevalidateResults.length > 0) throw rejectedRevalidateResults[0].reason

            return { data: revalidateResults.map((revalidateResult) => revalidateResult.value) }
        }catch(err){
            console.error(err)
            return { err }
        }
    }
}

const useQuery = async ({
    queryKey,
    queryGroup,
    queryFn,
    querySchema,
    ttl = 0,
}) => {
    try{
        configRevalidate({ queryKey, queryGroup, queryFn, querySchema })

        const cachedResult = await useGetCache({ queryKey })

        const isCachedData = Boolean(cachedResult?.data)
        const isExpired = isCachedData && Date.now() - cachedResult.data.timestamp > ttl
        const isHardReload = getContext({ key: 'isHardReload' }) ?? true

        if (isCachedData && !isExpired && !isHardReload){
            if (querySchema) {
                const schemaResult = querySchema.safeParse(cachedResult.data.data)
                if (!schemaResult.success) throw prettifyError({ error: schemaResult.error })

                return { data: schemaResult.data, isCached: true }
            }

            return { data: cachedResult.data.data, isCached: true }
        }

        const queryFnResult = await queryFn()
        if (queryFnResult?.err) throw queryFnResult
            
        const setCacheResult = await useSetCache({ queryKey, data: queryFnResult?.data })
        if (setCacheResult?.err) throw setCacheResult

        return { data: queryFnResult?.data, isCached: false }
    } catch (err) {
        console.error(err)
        return { err }
    }
}

export {
    useQuery,
    useGetCache,
    useSetCache,
    useRevalidate,
}