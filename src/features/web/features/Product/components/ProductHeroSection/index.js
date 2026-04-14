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

    const technicalSheetUrl = product.technicalSheet?.downloadURL
    const technicalSheetFilename = product.technicalSheet?.path?.split('/').at(-1) ?? 'ficha-tecnica.pdf'

    return html`
        ${
            WebHeroSection({
                title: html`
                    <h3>${product.name}</h3>
                `,
                description: html`
                    <span>${product.description}</span>
                    <!--
                    <br/>
                    <strong class="ColorRed">Gratis codo 20x90</strong>
                    -->
                `,
                toolbox: html`
                    ${
                        technicalSheetUrl
                            ? html`
                                <a
                                    href="${technicalSheetUrl}"
                                    download="${technicalSheetFilename}"
                                    class="Button PrimaryButton PrimaryButtonLarge PrimaryBlue"
                                    target="_blank"
                                    rel="noopener noreferrer"

                                    lg
                                >Descargar ficha técnica</a>
                                <a href="/" class="Button PrimaryButton PrimaryButtonLarge ColorBlue">
                                    <u>Regresar al inicio</u>
                                </a>
                            `
                            : html`
                                <a href="/" class="Button PrimaryButton PrimaryButtonLarge PrimaryBlue">
                                    Regresar al inicio
                                </a>
                            `
                    }
                    
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