import { html } from 'saloe/html'

import WebMeta from '@/features/web/components/WebMeta'

import * as WebHook from '@/features/web/hooks/WebHook'


const ProductMeta = async ({
    productId,
    productSlug,
}) => {
    const productResult = productSlug
        ? await WebHook.useGetProductBySlug({ slug: productSlug, ttl: 10_000 })
        : await WebHook.useGetProductById({ id: productId, ttl: 10_000 })
    const { data: product } = productResult

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