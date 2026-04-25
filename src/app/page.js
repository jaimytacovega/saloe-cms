import { html, stream } from 'saloe/html'
import { getScriptListener } from '@/shared/lib/@saloe-listener'

import WebMeta from '@/features/web/components/WebMeta'
import HomePage from '@/features/web/features/Home/components/HomePage'


const page = async ({
    request,
    env,
    cookies,
}) => {
    const url = new URL(request.url)
    const isSearch = url.pathname.includes('/search')
    const searchParams = url.searchParams

    return stream({
        head: () => html`
            ${
                WebMeta({})
            }
        `,
        body: async () => html`
            ${
                await HomePage({
                    isSearch,
                    searchParams,
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