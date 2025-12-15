import { html } from 'saloe/html'

import HomePromoSection from '@/features/web/features/Home/components/HomePromoSection'
import HomeCategoryGridSection from '@/features/web/features/Home/components/HomeCategoryGridSection'
import WebInfoCard from '@/features/web/components/WebInfoCard'

import * as WebHook from '@/features/web/hooks/WebHook'
import {
    getSubCategoryIdsMapByCategoryIdMap,
    getRegularAndFeaturedPromotions,
} from '@/features/web/utils'


const HomeCategoriesAndPromosGridSections = async () => {
    const { data: categories } = await WebHook.useListCategories({ ttl: 10_000 })
    const { data: brands } = await WebHook.useListBrandsByCategories({ categories, ttl: 10_000 })
    const { data: category_subCategories } = await WebHook.useListCategory_SubCategoriesByCategories({ categories, ttl: 10_000 })
    const { data: promotions } = await WebHook.useListPromotionsByBrands({ brands, ttl: 10_000 })
    
    const subCategoryIdsMapByCategoryIdMap = await getSubCategoryIdsMapByCategoryIdMap({
        category_subCategories,
    })
    const { regularPromotions } = getRegularAndFeaturedPromotions({ promotions})
    
    const result = []
    let promoIndex = 0

    categories.forEach((category, i) => {
        const columns = i % 2 === 0 ? '2mobile4desktop' : '1mobile2desktop'
        result.push(
            HomeCategoryGridSection({
                category,
                columns,
                grid: [...(subCategoryIdsMapByCategoryIdMap.get(category.id) ?? new Map()).values().map((subCategory) => {
                    return WebInfoCard({
                        title: html`
                            <h5>${subCategory.name}</h5>
                        `,
                        description: html`
                            <p>${subCategory.description}</p>
                        `,
                        toolbox: html`
                            <button class="Button PrimaryButton ColorBlue">
                                <u>Me interesa</u>
                            </button>
                        `,
                        thumbnail: subCategory.image.downloadURL,
                    })
                })].join(''),
            })
        )

        const shouldInsertPromotion = (i + 1) % 2 === 0 && promoIndex < promotions.length

        if (shouldInsertPromotion) {
            const promotion = regularPromotions[promoIndex]
            const isReversed = promoIndex % 2 === 1

            result.push(
                HomePromoSection({
                    promotion,
                    isReversed,
                })
            )

            promoIndex++
        }
    })

    return result.join('')
}

export default HomeCategoriesAndPromosGridSections