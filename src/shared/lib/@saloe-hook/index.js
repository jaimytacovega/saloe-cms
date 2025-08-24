import { isCloudflareWorker } from 'saloe/util'
import { getNavigateState, NAVIGATE_STATE } from '@/shared/lib/@saloe-hook/utils'
import { getContext } from '@/shared/lib/@saloe-context/index'


const CACHE_NAME = 'HOOKS_DEV'
// const HOOK_KEY = 'brand-hook';
// const hookKey = `${HOOK_KEY}-get-${source}-${id}`

const transformQueryKey = ({ queryKey }) => {
    if (Array.isArray(queryKey)) return queryKey.join('-')
    return queryKey
}

const getCacheAsServiceWorker = async ({ cacheUrl }) => {
    try{
        const cache = await Cache.get(CACHE_NAME)
        if (!cache) throw 'cache-not-found'

        const cachedResponse = await cache.get(cacheUrl)

        return { data: cachedResponse }
    }catch(err){
        console.error(err)
        return { err }
    }
}

const getCacheAsCloudflareWorker = async ({ cacheUrl }) => {
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

const setCacheAsCloudflareWorker = async ({ cacheUrl, data }) => {
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

        if (!kvSetResponse.ok) throw 'kv-set-failed'

        return { data, timestamp }

    }catch(err){
        console.error(err)
        return { err }
    }
}

const useQuery = async ({
    queryKey,
    queryFn,
    ttl = 0,
}) => {
    try{
        const env = getContext({ key: 'env' })
        
        if (!env) throw 'env-not-found'

        const getCache = isCloudflareWorker({ env }) 
            ? getCacheAsCloudflareWorker 
            : null

        const setCache = isCloudflareWorker({ env }) 
            ? setCacheAsCloudflareWorker 
            : null

        const cacheKey = transformQueryKey({ queryKey })
        const cacheUrl = `~/hooks/${cacheKey}`

        const cachedResult = await getCache({ cacheUrl })

        const isCachedData = Boolean(cachedResult?.data)
        const isExpired = isCachedData && Date.now() - cachedResult.data.timestamp > ttl

        if (isCachedData && !isExpired) return { data: cachedResult.data.data, isCached: true }

        const queryFnResult = await queryFn()
        if (queryFnResult?.err) throw queryFnResult
            
        const setCacheResult = await setCache({ cacheUrl, data: queryFnResult?.data })
        if (setCacheResult?.err) throw setCacheResult

        return { data: queryFnResult?.data, isCached: false }
    } catch (err) {
        console.error(err)
        return { err }
    }
}

export {
    useQuery,
}