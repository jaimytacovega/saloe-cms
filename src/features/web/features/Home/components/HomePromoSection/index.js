import { html } from 'saloe/html'

import WebHeroSection from '@/features/web/components/WebHeroSection'


const HomePromoSection = ({
    isReversed = false,
}= {}) => {
    return html`
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
                isReversed,
            })
        }
    `
}

export default HomePromoSection