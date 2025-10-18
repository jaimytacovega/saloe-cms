import { html, stream } from 'saloe/html'
import { getScriptListener } from 'saloe/listener'

import CmsMeta from '@/features/cms/components/CmsMeta'
import PromotionPage from '@/features/cms/features/Promotion/components/PromotionPage'
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
    const promotionId = match?.pathname?.groups?.id

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
                await PromotionPage({
                    promotionId,
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