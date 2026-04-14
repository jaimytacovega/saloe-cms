import { html } from 'saloe/html'

import WebHeroSection from '@/features/web/components/WebHeroSection'
import WebLegalsSection from '@/features/web/components/WebLegalsSection'
import WebAddToQuotationButton, { AddToQuotationButtonTypes } from '@/features/web/components/WebAddToQuotationButton'

import * as WebHook from '@/features/web/hooks/WebHook'


const SubCategoryHeroSection = async ({
    subCategoryId,
}) => {
    const { data: subCategory } = await WebHook.useGetSubCategoryById({
        id: subCategoryId,
        ttl: 10_000,
    })

    return html`
        ${
            WebHeroSection({
                title: html`
                    <h3>${subCategory.name}</h3>
                `,
                description: html`
                    <span>${subCategory.description}</span>
                    <!--
                    <br/>
                    <strong class="ColorRed">Gratis codo 20x90</strong>
                    -->
                `,
                toolbox: html`
                    ${
                        WebAddToQuotationButton({
                            toastId: `addSubCategoryToQuotationToast-${subCategory.id}`,
                            toastMessage: 'Subcategoría agregada al pedido',
                            toastTimeout: 2_500,
                            itemId: subCategory.id,
                            itemType: AddToQuotationButtonTypes.SubCategory,
                            className: 'Button PrimaryButton PrimaryBlue',
                            children: 'Me interesa'
                        })
                    }
                    <button class="Button PrimaryButton ColorBlue">
                        <u>Regresar al inicio</u>
                    </button>
                `,
                isReversed: true,
                thumbnail: subCategory.image.downloadURL,
            })
        }
        ${
            WebLegalsSection()
        }
    `

}

export default SubCategoryHeroSection