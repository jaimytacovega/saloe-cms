import { html } from 'saloe/html'

import WebMeta from '@/features/web/components/WebMeta'

import * as WebHook from '@/features/web/hooks/WebHook'


const ProductMeta = async ({
    productId,
}) => {
    const { data: product } = await WebHook.useGetProductById({
        id: productId,
        ttl: 10_000,
    })

    return html`
        ${
            WebMeta({
                title: product?.seoTitle ?? product?.name ?? '',
                description: product?.seoDescription ?? product?.description ?? '',
                image: product.image?.downloadURL,
                canonical: product?.seoSlug ?? '',
                index: product.seoIndexFollow,
                follow: product.seoIndexFollow,
            })
        }
    `
}

export default ProductMeta