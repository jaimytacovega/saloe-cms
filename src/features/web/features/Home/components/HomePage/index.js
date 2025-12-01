import { html } from 'saloe/html'

import HomeMenu from '@/features/web/features/Home/components/HomeMenu'
import HomeHeroSection from '@/features/web/features/Home/components/HomeHeroSection'
import HomeCategoryGridSection from '@/features/web/features/Home/components/HomeCategoryGridSection'
import HomePromoSection from '@/features/web/features/Home/components/HomePromoSection'
import HomePromoGridSection from '@/features/web/features/Home/components/HomePromoGridSection'
import WebInfoCard from '@/features/web/components/WebInfoCard'
import HomeQuotationDialog from '@/features/web/features/Home/components/HomeQuotationDialog'

import WebStickySection from '@/features/web/components/WebStickySection'


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

const HomePage = () => {
    return html`
        <main>
            ${
                HomeMenu()
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