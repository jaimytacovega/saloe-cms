import { html, stream } from 'saloe/html'
import { getScriptListener } from 'saloe/listener'

import CmsMeta from '@/features/cms/components/CmsMeta'
import SubCategoryPage from '@/features/cms/features/SubCategory/components/SubCategoryPage'
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
                await SubCategoryPage({
                    subCategoryId: 'new',
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