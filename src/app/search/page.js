import { html, stream } from 'saloe/html'
import { getScriptListener } from 'saloe/listener'

import WebMeta from '@/features/web/components/WebMeta'
import HomePage from '@/features/web/features/Home/components/HomePage'


const page = async ({
    request,
    env,
    cookies,
}) => {
    const { searchParams } = new URL(request.url)

    return stream({
        head: () => html`
            ${
                WebMeta({})
            }
        `,
        body: async () => html`
            ${
                await HomePage({
                    isSearch: true,
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