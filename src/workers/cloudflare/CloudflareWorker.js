import manifestJSON from '__STATIC_CONTENT_MANIFEST'

import {
    findPatternFromUrl,
    getRedirectResponse,
    getForbiddenResponse,
    getServerOnlyResponse,
    getNotFoundResponse,
    getRoute,
} from 'saloe/router'
import { getStaticResponse } from 'saloe/cloudflare-worker'

import { setRouter } from '@/workers/cloudflare/CloudflareWorkerRouter'


setRouter()

const CloudflareWorker = {
    fetch: async ({ request, env, ctx }) => {
        const url = new URL(request.url)

        const urlPattern = findPatternFromUrl({ url })
        const route = getRoute({ pathname: urlPattern?.pathname })
        const routeResult = route 
            ? await route({ 
                request, 
                urlPattern, 
                env, 
                cookies: request.headers.get('Cookie'),
            }) 
            : null
        
        if (routeResult?.response) return routeResult.response

        const staticResult = await getStaticResponse({ request, waitUntil: ctx.waitUntil.bind(ctx), manifestJSON, env })
        if (staticResult?.response) return staticResult?.response

        const notFoundResult = await getNotFoundResponse({ request })
	    return notFoundResult?.response
    },
}

export default {
	fetch: (request, env, ctx) => CloudflareWorker.fetch({ request, env, ctx })
}