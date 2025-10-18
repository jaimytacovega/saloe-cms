import { html, stream } from 'saloe/html'
import { getScriptListener } from 'saloe/listener'

import CmsMeta from '@/features/cms/components/CmsMeta'
import QuotationPage from '@/features/cms/features/Quotation/components/QuotationPage'
import { redirectIfMissingSearchParams } from '@/features/cms/utils/utils'


const page = async ({ 
    request, 
    env, 
    cookies,
}) => {
    const { searchParams, pathname } = new URL(request?.url)
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
                await QuotationPage({
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