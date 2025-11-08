import { html } from 'saloe/html'

import WebTopMenu from '@/features/web/components/WebTopMenu'
import WebStickyBanner from '@/features/web/components/WebStickyBanner'
import WebNavigation from '@/features/web/components/WebNavigation'
import WebHeroSection from '@/features/web/components/WebHeroSection'
import WebGridSection from '@/features/web/components/WebGridSection'


const HomePage = () => {
    return html`
        <main>
            ${
                WebTopMenu()
            }
            ${
                WebStickyBanner()
            }
            ${
                WebNavigation()
            }
            ${
                WebHeroSection({
                    preTitle: 'Productos para constructoras y ferreterias',
                    title: html`
                        <h1>Cotiza tu pedido con nosotros</h1>
                    `,
                    description: 'De la manera más rapida y sencilla, adjunta tu pedido, dejando tus datos y nosotros te contactaremos.',
                    toolbox: html`
                        <button class="Button PrimaryButton PrimaryBlue">Cotizar pedido</button>
                    `,
                })
            }
            ${
                WebGridSection()
            }
            ${
                WebHeroSection({
                    title: html`
                        <h3>Tubos de agua 1/2 C/R Nicoll</h3>
                    `,
                    description: html`
                        <span>Por la compra de 25 unidades</span>
                        <br/>
                        <strong class="ColorRed">Gratis codo 20x90</strong>
                    `,
                    toolbox: html`
                        <button class="Button PrimaryButton PrimaryBlue">Deseo esta promoción</button>
                        <button class="Button PrimaryButton ColorBlue">
                            <u>Ver más promociones</u>
                        </button>
                    `,
                })
            }
        </main>
    `
}

export default HomePage