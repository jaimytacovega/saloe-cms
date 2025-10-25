import { html, stream } from 'saloe/html'
import { getScriptListener } from 'saloe/listener'

import CmsMeta from '@/features/cms/components/CmsMeta'
import QuotationPage from '@/features/cms/features/Quotation/components/QuotationPage'
import { redirectIfMissingSearchParams } from '@/features/cms/utils/utils'

import * as AuthService from '@/shared/services/AuthService'


const page = async ({ 
    request, 
    env, 
    cookies,
}) => {
    const { authId } = AuthService.getCredentialsFromCookies({ cookies })
    if (!authId) return { response: Response.redirect(new URL('/auth/login', request.url)) }
    
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
                    quotationId: 'new',
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