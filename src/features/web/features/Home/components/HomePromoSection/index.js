import { html } from 'saloe/html'

import WebHeroSection from '@/features/web/components/WebHeroSection'
import WebAddToQuotationButton, { AddToQuotationButtonTypes } from '@/features/web/components/WebAddToQuotationButton'


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
                    <!--
                    <br/>
                    <strong class="ColorRed">Gratis codo 20x90</strong>
                    -->
                `,
                toolbox: html`
                    ${
                        WebAddToQuotationButton({
                            toastId: `addPromotionToQuotationToast-${promotion.id}`,
                            toastMessage: 'Promoción agregada al pedido',
                            toastTimeout: 2_500,
                            itemId: promotion.id,
                            itemType: AddToQuotationButtonTypes.Promotion,
                            className: 'Button PrimaryButton PrimaryBlue',
                            children: 'Quiero esta promoción'
                        })
                    }
                    <!--
                    <button class="Button PrimaryButton ColorBlue">
                        <u>Ver más promociones</u>
                    </button>
                    -->
                `,
                isReversed,
                thumbnail: promotion.image.downloadURL,
            })
        }
    `
}

export default HomePromoSection