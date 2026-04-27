import { html } from 'saloe/html'

import * as WebHook from '@/features/web/hooks/WebHook'

import WebHeroSection from '@/features/web/components/WebHeroSection'



const HomeHeroSection = async () => {
    const { data: banners } = await WebHook.useListPublishedBanners({ ttl: 10_000 })

    const DEFAULT_BANNER = {
        pretitle: 'Productos para constructoras y ferreterias',
        title: 'Cotiza tu pedido con nosotros',
        description: 'De la manera más rapida y sencilla, adjunta tu pedido, dejando tus datos y nosotros te contactaremos.',
        image: '/img/thumbnail/hero-1.png',
    }

    const banner = banners?.at(0) ?? DEFAULT_BANNER

    return html`
        ${
            WebHeroSection({
                preTitle: banner.pretitle,
                title: html`
                    <h1>${banner.title}</h1>
                `,
                description: banner.description,
                toolbox: html`
                    <button class="Button PrimaryButton PrimaryBlue">Cotizar pedido</button>
                `,
                isHeroImage: true,
                thumbnail: banner.image.downloadURL,
            })
        }
    `
}

export default HomeHeroSection