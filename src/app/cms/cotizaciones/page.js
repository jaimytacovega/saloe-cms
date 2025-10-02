import { html, stream } from 'saloe/html'

import CmsMeta from '@/features/cms/components/CmsMeta'
import OrderPage from '@/features/cms/features/Order/components/OrderPage'
import { redirectIfMissingSearchParams } from '@/features/cms/utils/utils'


const page = async ({ 
    request, 
    env, 
    cookies,
}) => {
    const searchParams = new URL(request.url).searchParams
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
                await OrderPage({
                    searchParams,
                })
            }
        `,
        scripts: () => html``,
        env,
    })
}

export default page