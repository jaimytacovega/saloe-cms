import { html } from 'saloe/html'

import HomePromoSection from '@/features/web/features/Home/components/HomePromoSection'
import HomeCategoryGridSection from '@/features/web/features/Home/components/HomeCategoryGridSection'
import WebInfoCard from '@/features/web/components/WebInfoCard'
import WebAddToQuotationButton, { AddToQuotationButtonTypes } from '@/features/web/components/WebAddToQuotationButton'

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
    const { regularPromotions } = getRegularAndFeaturedPromotions({ promotions })

    const { sections } = categories.reduce(
        (acc, category, i) => {
            const columns = i % 2 === 0 ? '2mobile4desktop' : '1mobile2desktop'
            const gridSection = HomeCategoryGridSection({
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
                            ${
                                WebAddToQuotationButton({
                                    toastId: `addSubCategoryToQuotationToast-${subCategory.id}`,
                                    toastMessage: 'Subcategoría agregada al pedido',
                                    toastTimeout: 2_500,
                                    itemId: subCategory.id,
                                    itemType: AddToQuotationButtonTypes.SubCategory,
                                    className: 'Button PrimaryButton ColorBlue',
                                    children: html`<u>Me interesa</u>`
                                })
                            }
                        `,
                        thumbnail: subCategory.image.downloadURL,
                    })
                })].join(''),
            })

            const shouldInsertPromotion = (i + 1) % 2 === 0 && acc.promoIndex < promotions.length
            const promotion = shouldInsertPromotion ? regularPromotions[acc.promoIndex] : undefined

            if (shouldInsertPromotion && promotion) {
                return {
                    sections: [
                        ...acc.sections,
                        gridSection,
                        HomePromoSection({
                            promotion,
                            isReversed: acc.promoIndex % 2 === 1,
                        }),
                    ],
                    promoIndex: acc.promoIndex + 1,
                }
            }

            return {
                sections: [...acc.sections, gridSection],
                promoIndex: acc.promoIndex,
            }
        },
        { sections: [], promoIndex: 0 },
    )

    return sections.join('')
}

export default HomeCategoriesAndPromosGridSections