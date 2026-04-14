import { html } from 'saloe/html'

import ProductMenu from '@/features/web/features/Product/components/ProductMenu'
import ProductHeroSection from '@/features/web/features/Product/components/ProductHeroSection'


const ProductPage = async ({
    productId,
}) => {
    return html`
        <main>
            ${
                await ProductMenu()
            }
            ${
                await ProductHeroSection({
                    productId,
                })
            }
        </main>
    `
}

export default ProductPage