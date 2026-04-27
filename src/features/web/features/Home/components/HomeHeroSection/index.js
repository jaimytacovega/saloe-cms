import { html } from 'saloe/html'

import * as WebHook from '@/features/web/hooks/WebHook'

import WebHeroSection from '@/features/web/components/WebHeroSection'



const HomeHeroSection = async () => {
    const { data: banners } = await WebHook.useListPublishedBanners({ ttl: 10_000 })
    const banner = banners?.at(0)

    return html`
        ${
            WebHeroSection({
                preTitle: banner?.pretitle ?? 'Productos para constructoras y ferreterias',
                title: html`
                    <h1>${banner?.title ?? 'Cotiza tu pedido con nosotros'}</h1>
                `,
                description: banner?.description ?? 'De la manera más rapida y sencilla, adjunta tu pedido, dejando tus datos y nosotros te contactaremos.',
                toolbox: html`
                    <button class="Button PrimaryButton PrimaryBlue">Cotizar pedido</button>
                `,
                isHeroImage: true,
                thumbnail: banner?.image.downloadURL ?? '/img/thumbnail/hero-1.png',
            })
        }
    `
}

export default HomeHeroSection