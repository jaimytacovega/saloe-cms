import { html } from 'saloe/html'

import WebHeroSection from '@/features/web/components/WebHeroSection'


const HomePromoSection = ({
    promotion,
    isReversed = false,
}= {}) => {
    return html`
        ${
            WebHeroSection({
                title: html`
                    <h3>${promotion.name}</h3>
                `,
                description: html`
                    <span>${promotion.description}</span>
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
                thumbnail: promotion.image.downloadURL,
            })
        }
    `
}

export default HomePromoSection