import { html } from 'saloe/html'

import HomeMenu from '@/features/web/features/Home/components/HomeMenu'
import HomeHeroSection from '@/features/web/features/Home/components/HomeHeroSection'
import HomeCategoryGridSection from '@/features/web/features/Home/components/HomeCategoryGridSection'
import HomePromoSection from '@/features/web/features/Home/components/HomePromoSection'
import HomePromoGridSection from '@/features/web/features/Home/components/HomePromoGridSection'
import WebInfoCard from '@/features/web/components/WebInfoCard'
import HomeQuotationDialog from '@/features/web/features/Home/components/HomeQuotationDialog'
import HomeBrandFilterStickySection from '@/features/web/features/Home/components/HomeBrandFilterStickySection'

import * as BrandHook from '@/shared/hooks/BrandHook'
import * as CategoryHook from '@/shared/hooks/CategoryHook'
import * as SubCategoryHook from '@/shared/hooks/SubCategoryHook'
import * as PromotionHook from '@/shared/hooks/PromotionHook'
import * as Category_SubCategoryHook from '@/shared/hooks/Category_SubCategoryHook'

import { Source } from '@/shared/utils/constants'
import { queryBySearchParams, OperatorSymbols } from '@/shared/services/DatabaseService'


const getCategories = async () => {
    const searchParams = new URLSearchParams()
    searchParams.set('page', '1')
    searchParams.set('pageSize', '20')
    searchParams.set('sort', 'updatedAt:desc')

    const { data: categories } = await queryBySearchParams({
        query: ({ listArguments }) => {
            return CategoryHook.useList({
                source: Source.FIREBASE,
                ...listArguments,
                ttl: 60_000,
            })
        },
        searchParams,
    })

    return categories
}

const getCategory_SubCategoriesByCategoryIds = async ({
    categoryIds,
}) => {
     const searchParams = new URLSearchParams()
     searchParams.set('filter', `categoryId:${OperatorSymbols.In.at(0)}${categoryIds.join(';')}${OperatorSymbols.In.at(1)}`)

     const { data: category_subCategories } = await queryBySearchParams({
         query: ({ listArguments }) => {
             return Category_SubCategoryHook.useList({
                 source: Source.FIREBASE,
                 ...listArguments,
                 ttl: 60_000,
             })
         },
         searchParams,
     })

     return category_subCategories
}

const getBrandsByIds = async ({
    ids,
}) => {
    const searchParams = new URLSearchParams()
    searchParams.set('filter', `id:${OperatorSymbols.In.at(0)}${ids.join(';')}${OperatorSymbols.In.at(1)}`)

    const { data: brands } = await queryBySearchParams({
        query: ({ listArguments }) => {
            return BrandHook.useList({
                source: Source.FIREBASE,
                ...listArguments,
                ttl: 60_000,
            })
        },
        searchParams,
    })

    return brands
}

const getSubCategoriesByIds = async ({
    ids,
}) => {
    const searchParams = new URLSearchParams()
    searchParams.set('filter', `id:${OperatorSymbols.In.at(0)}${ids.join(';')}${OperatorSymbols.In.at(1)}`)

    const { data: subCategories } = await queryBySearchParams({
        query: ({ listArguments }) => {
            return SubCategoryHook.useList({
                source: Source.FIREBASE,
                ...listArguments,
                ttl: 60_000,
            })
        },
        searchParams,
    })

    return subCategories
}

const getPromotionsByBrandIds = async ({
    brandIds,
}) => {
    const searchParams = new URLSearchParams()
    searchParams.set('filter', `brandId:${OperatorSymbols.In.at(0)}${brandIds.join(';')}${OperatorSymbols.In.at(1)}`)

    const { data: promotions } = await queryBySearchParams({
        query: ({ listArguments }) => {
            return PromotionHook.useList({
                source: Source.FIREBASE,
                ...listArguments,
                ttl: 60_000,
            })
        },
        searchParams,
    })

    return promotions
}

const HomePage = async () => {
    const categories = await getCategories()  
    const categoriesByIdMap = categories.reduce((acc, category) => {
        acc.set(category.id, category)
        return acc
    }, new Map())
    const categoryIds = [...categoriesByIdMap.keys()]
    const brandIds = [...categories.reduce((acc, category) => {
        category.brandIds.forEach((brandId) => {
            if (Boolean(brandId)) acc.add(brandId)
        })
        return acc
    }, new Set())]

    const category_subCategories = await getCategory_SubCategoriesByCategoryIds({ categoryIds })
    const subCategoryIdsMapByCategoryIdMap = category_subCategories.reduce((acc, { categoryId, subCategoryId }) => {
        if (!acc.has(categoryId)) acc.set(categoryId, new Map())
        acc.get(categoryId).set(subCategoryId, subCategoryId)
        return acc
    }, new Map())

    await Promise.all(
        [...subCategoryIdsMapByCategoryIdMap.keys()].map(async (categoryId) => {
            const subCategoryIdsMap = subCategoryIdsMapByCategoryIdMap.get(categoryId)
            const subCategoryIds = [...subCategoryIdsMap.keys()]
            const subCategories = await getSubCategoriesByIds({ ids: subCategoryIds })

            subCategories.forEach((subCategory) => {
                subCategoryIdsMap.set(subCategory.id, subCategory)
            })
        })
    )
    
    const brands = await getBrandsByIds({ ids: brandIds })
    const brandIdsMap = brands.reduce((acc, brand) => {
        acc.set(brand.id, brand)
        return acc
    }, new Map())
    
    const promotions = await getPromotionsByBrandIds({ brandIds })

    // TODO: Implement featured promotions
    const { regularPromotions, featuredPromotions } = promotions.reduce((acc, promotion, index) => {
        // if (promotion.isFeatured) acc.featuredPromotions.push(promotion)
        if (index === promotions.length - 1) acc.featuredPromotions.push(promotion)
        else acc.regularPromotions.push(promotion)
        return acc
    }, { regularPromotions: [], featuredPromotions: [] })

    return html`
        <main>
            ${
                HomeMenu({
                    brands,
                    categories,
                })
            }
            ${
                HomeHeroSection()
            }
            ${
                HomeBrandFilterStickySection({
                    brands,
                    categories,
                    subCategoryIdsMapByCategoryIdMap,
                    promotions: regularPromotions,
                })
            }
            ${
                (() => {
                    const result = []
                    let promoIndex = 0

                    categories.forEach((category, i) => {
                        const columns = i % 2 === 0 ? 4 : 2
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
                })()
            }
            ${
                HomePromoGridSection({
                    columns: 3,
                    grid: featuredPromotions.map((promotion) => {
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
                                <button class="Button PrimaryButton PrimaryBlue">Quiero esta promoción</button>
                            `,
                            isThumbnailWithTag: true,
                            isPromo: true,
                            thumbnail: promotion.image.downloadURL,
                            tagThumbnail: brandIdsMap.get(promotion.brandId).image.downloadURL,
                        })
                    }).join(''),
                })
            }
            ${
                HomeQuotationDialog({
                    promotions,
                })
            }
        </main>
    `
}

export default HomePage