import { html, stream } from 'saloe/html'
import { getScriptListener } from 'saloe/listener'

import CmsMeta from '@/features/cms/components/CmsMeta'
import ProductPage from '@/features/cms/features/Product/components/ProductPage'
import { redirectIfMissingSearchParams } from '@/features/cms/utils/utils'


const page = async ({ 
    request, 
    env, 
    cookies,
    urlPattern,
}) => {
    const url = new URL(request?.url)
    const { searchParams, pathname } = url
    const match = urlPattern?.exec(url?.href)
    const productId = match?.pathname?.groups?.id

    const { response: redirectResponse } = redirectIfMissingSearchParams({ request, searchParams })
    if (redirectResponse) return { response: redirectResponse }
    
    return stream({
        head: () => html`
            ${
                CmsMeta()
            }
        `,
        body: async () => html`
            ${
                await ProductPage({
                    productId,
                    searchParams,
                    pathname,
                })
            }
        `,
        scripts: () => html`
            ${
                getScriptListener({
                    listenAfterMs: 500,
                })
            }
        `,
        env,
    })
}

export default page