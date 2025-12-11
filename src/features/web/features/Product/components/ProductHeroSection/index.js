import { html } from 'saloe/html'

import WebHeroSection from '@/features/web/components/WebHeroSection'
import WebLegalsSection from '@/features/web/components/WebLegalsSection'

import * as WebHook from '@/features/web/hooks/WebHook'


const ProductHeroSection = async ({
    productId,
}) => {
    const { data: product } = await WebHook.useGetProductById({
        id: productId,
        ttl: 10_000,
    })

    return html`
        ${
            WebHeroSection({
                title: html`
                    <h3>${product.name}</h3>
                `,
                description: html`
                    <span>${product.description}</span>
                    <br/>
                    <strong class="ColorRed">Gratis codo 20x90</strong>
                `,
                toolbox: html`
                    <button class="Button PrimaryButton PrimaryBlue">Me interesa</button>
                    <button class="Button PrimaryButton ColorBlue">
                        <u>Regresar al inicio</u>
                    </button>
                `,
                isReversed: true,
                thumbnail: product.image.downloadURL,
            })
        }
        ${
            WebLegalsSection()
        }
    `

}

export default ProductHeroSection