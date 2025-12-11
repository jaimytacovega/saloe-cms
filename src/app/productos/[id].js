import { html, stream } from 'saloe/html'
import { getScriptListener } from 'saloe/listener'

import WebMeta from '@/features/web/components/WebMeta'
import ProductPage from '@/features/web/features/Product/components/ProductPage'


const page = async ({
    request,
    env,
    cookies,
    urlPattern,
}) => {
    const url = new URL(request.url)
    const match = urlPattern?.exec(url?.href)
    const productId = match?.pathname?.groups?.id

    return stream({
        head: () => html`
            ${
                WebMeta()
            }
        `,
        body: async () => html`
            ${
                await ProductPage({
                    productId,
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