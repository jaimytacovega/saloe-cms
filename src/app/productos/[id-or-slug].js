import { html, stream } from 'saloe/html'
import { getScriptListener } from 'saloe/listener'

import ProductMeta from '@/features/cms/features/Product/components/ProductMeta'
import ProductPage from '@/features/web/features/Product/components/ProductPage'


/**
 * `urlPattern` is either `/productos/:id` or `/productos/:slug(...)`, so only one of
 * `pathname.groups.id` / `pathname.groups.slug` is set per match.
 */
const page = async ({
    request,
    env,
    urlPattern,
}) => {
    const url = new URL(request.url)
    const match = urlPattern?.exec(url?.href)
    const productId = match?.pathname?.groups?.id
    const productSlug = match?.pathname?.groups?.slug

    return stream({
        head: async () => html`
            ${
                await ProductMeta({
                    productId,
                    productSlug,
                })
            }
        `,
        body: async () => html`
            ${
                await ProductPage({
                    productId,
                    productSlug,
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
