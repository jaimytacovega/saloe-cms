import { html } from 'saloe/html'

import HomeMenu from '@/features/web/features/Home/components/HomeMenu'
import HomeHeroSection from '@/features/web/features/Home/components/HomeHeroSection'
import WebQuotationDialog from '@/features/web/components/WebQuotationDialog'
import HomeBrandFilterStickySection from '@/features/web/features/Home/components/HomeBrandFilterStickySection'
import HomeCategoriesAndPromosGridSections from '@/features/web/features/Home/components/HomeCategoriesAndPromosGridSections'
import HomeFeaturedPromoGridSections from '@/features/web/features/Home/components/HomeFeaturedPromoGridSections'
import HomeSalesAdvisorsSection from '@/features/web/features/Home/components/HomeSalesAdvisorsSection'


const HomePage = async ({
    isSearch = false,
    searchParams = new URLSearchParams(),
}) => {
    return html`
        <main>
            ${
                await HomeMenu({
                    isSearch,
                })
            }
            ${
                isSearch
                    ? ''
                    : await HomeHeroSection()
            }
            ${
                await HomeBrandFilterStickySection({
                    isSearch,
                    searchParams,
                })
            }
            ${
                isSearch
                    ? ''
                    : html`
                        ${
                            await HomeCategoriesAndPromosGridSections()
                        }
                        ${
                            await HomeFeaturedPromoGridSections()
                        }
                    `
            }
            ${
                HomeSalesAdvisorsSection()
            }
            ${
                await WebQuotationDialog()
            }
        </main>
    `
}

export default HomePage