import { html } from 'saloe/html'

import ProductMenu from '@/features/web/features/Product/components/ProductMenu'
import ProductHeroSection from '@/features/web/features/Product/components/ProductHeroSection'


const ProductPage = async ({
    productId,
    productSlug,
}) => {
    return html`
        <main>
            ${
                await ProductMenu()
            }
            ${
                await ProductHeroSection({
                    productId,
                    productSlug,
                })
            }
        </main>
    `
}

export default ProductPage