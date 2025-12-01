import { html } from 'saloe/html'

import HomeMenu from '@/features/web/features/Home/components/HomeMenu'
import HomeHeroSection from '@/features/web/features/Home/components/HomeHeroSection'
import HomeCategoryGridSection from '@/features/web/features/Home/components/HomeCategoryGridSection'
import HomePromoSection from '@/features/web/features/Home/components/HomePromoSection'
import HomePromoGridSection from '@/features/web/features/Home/components/HomePromoGridSection'
import WebInfoCard from '@/features/web/components/WebInfoCard'
import HomeQuotationDialog from '@/features/web/features/Home/components/HomeQuotationDialog'

import WebStickySection from '@/features/web/components/WebStickySection'

import * as BrandHook from '@/shared/hooks/BrandHook'
import * as CategoryHook from '@/shared/hooks/CategoryHook'
import * as SubCategoryHook from '@/shared/hooks/SubCategoryHook'
import * as PromotionHook from '@/shared/hooks/PromotionHook'

import { Source } from '@/shared/utils/constants'
import { queryBySearchParams } from '@/shared/services/DatabaseService'


const CategoryCard = WebInfoCard({
    title: html`
        <h5>Tubos y Conexiones de PVC</h5>
    `,
    description: html`
        <p>Lorem ipsum dolor sit amet consectetur.</p>
    `,
    toolbox: html`
        <button class="Button PrimaryButton ColorBlue">
            <u>Me interesa</u>
        </button>
    `,
    thumbnail: '/img/thumbnail/product.png',
})

const PromoCard = WebInfoCard({
    title: html`
        <h5>Tubos de agua 1/2 C/R Nicoll</h5>
    `,
    description: html`
        <p>
            <span>Lorem ipsum dolor sit amet consectetur.</span>
            <br/>
            <strong class="ColorRed">Gratis 10 codos</strong>
        </p>
    `,
    toolbox: html`
        <button class="Button PrimaryButton PrimaryBlue">Quiero esta promoción</button>
    `,
    isThumbnailWithTag: true,
    isPromo: true,
    thumbnail: '/img/thumbnail/promotion.png',
})

const getBrands = async () => {
    const searchParams = new URLSearchParams()
    searchParams.set('page', '1')
    searchParams.set('pageSize', '20')
    searchParams.set('sort', 'updatedAt:desc')

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

const getPromotions = async () => {
    const searchParams = new URLSearchParams()
    searchParams.set('page', '1')
    searchParams.set('pageSize', '20')
    searchParams.set('sort', 'updatedAt:desc')

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

const getSubCategories = async () => {
    const searchParams = new URLSearchParams()
    searchParams.set('page', '1')
    searchParams.set('pageSize', '20')
    searchParams.set('sort', 'updatedAt:desc')

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

const getSubCategoriesByCategories = async () => {
    const searchParams = new URLSearchParams()
    searchParams.set('page', '1')
    searchParams.set('pageSize', '20')
    searchParams.set('sort', 'updatedAt:desc')

    const { data: subCategoriesByCategories } = await queryBySearchParams({
        query: ({ listArguments }) => {
            return SubCategoryHook.useList({
                source: Source.FIREBASE,
                ...listArguments,
                ttl: 60_000,
            })
        },
        searchParams,
    })
    return subCategoriesByCategories
}

const HomePage = async () => {
    const brands = await getBrands()
    const categories = await getCategories()
    // const promotions = await getPromotions()
    // const subCategories = await getSubCategories()
    // console.log('subCategories =', subCategories)

    // const subCategoriesByCategories = await getSubCategoriesByCategories()

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
                WebStickySection()
            }
            ${
                HomeCategoryGridSection({
                    columns: 4,
                    grid: [
                        CategoryCard,
                        CategoryCard,
                        CategoryCard,
                        CategoryCard,
                    ].join(''),
                })
            }
            ${
                HomeCategoryGridSection({
                    columns: 2,
                    grid: [
                        CategoryCard,
                        CategoryCard,
                    ].join(''),
                })
            }
            ${
                HomePromoSection()
            }
            ${
                HomeCategoryGridSection({
                    columns: 4,
                    grid: [
                        CategoryCard,
                        CategoryCard,
                        CategoryCard,
                        CategoryCard,
                    ].join(''),
                })
            }
            ${
                HomeCategoryGridSection({
                    columns: 2,
                    grid: [
                        CategoryCard,
                        CategoryCard,
                    ].join(''),
                })
            }
            ${
                HomePromoSection({
                    isReversed: true,
                })
            }
            ${
                HomeCategoryGridSection({
                    columns: 4,
                    grid: [
                        CategoryCard,
                        CategoryCard,
                        CategoryCard,
                        CategoryCard,
                    ].join(''),
                })
            }
            ${
                HomePromoGridSection({
                    columns: 3,
                    grid: [
                        PromoCard,
                        PromoCard,
                        PromoCard,
                    ].join(''),
                })
            }
            ${
                HomeQuotationDialog()
            }
        </main>
    `
}

export default HomePage