import { html, stream } from 'saloe/html'
import { getScriptListener } from 'saloe/listener'

import ProductMeta from '@/features/cms/features/Product/components/ProductMeta'
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
        head: async() => html`
            ${
                await ProductMeta({
                    productId,
                })
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