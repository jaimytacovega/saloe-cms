import { html } from 'saloe/html'

import HomePromoGridSection from '@/features/web/features/Home/components/HomePromoGridSection'
import WebInfoCard from '@/features/web/components/WebInfoCard'
import WebAddToQuotationButton, { AddToQuotationButtonTypes } from '@/features/web/components/WebAddToQuotationButton'

import * as WebHook from '@/features/web/hooks/WebHook'
import {
    getRegularAndFeaturedPromotions,
} from '@/features/web/utils'


const HomeFeaturedPromoGridSections = async () => {
    const { data: categories } = await WebHook.useListCategories({ ttl: 10_000 })
    const { data: brands } = await WebHook.useListBrandsByCategories({ categories, ttl: 10_000 })
    const { data: promotions } = await WebHook.useListPromotionsByBrands({ brands, ttl: 10_000 })

    const { featuredPromotions } = getRegularAndFeaturedPromotions({ promotions })

    const brandIdsMap = brands.reduce((acc, brand) => {
        acc.set(brand.id, brand)
        return acc
    }, new Map())

    return HomePromoGridSection({
        columns: '1mobile3desktop',
        grid: featuredPromotions?.map((promotion) => {
            return WebInfoCard({
                title: html`
                    <h5>${promotion.name}</h5>
                `,
                description: html`
                    <p>
                        <span>${promotion.description}</span>
                        <br/>
                        <strong class="ColorRed">Gratis 10 codos</strong>
                    </p>
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
                `,
                isThumbnailWithTag: true,
                isPromo: true,
                thumbnail: promotion.image.downloadURL,
                tagThumbnail: brandIdsMap.get(promotion.brandId).image.downloadURL,
            })
        }).join(''),
    })
}

export default HomeFeaturedPromoGridSections