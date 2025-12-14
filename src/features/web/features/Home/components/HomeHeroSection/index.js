import { html } from 'saloe/html'

import WebHeroSection from '@/features/web/components/WebHeroSection'


const HomeHeroSection = () => {
    return html`
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
                isHeroImage: true,
                thumbnail: '/img/thumbnail/hero.jpeg',
            })
        }
    `
}

export default HomeHeroSection