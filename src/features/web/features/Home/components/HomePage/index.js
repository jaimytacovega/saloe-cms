import { html } from 'saloe/html'

import HomeMenu from '@/features/web/features/Home/components/HomeMenu'
import HomeHeroSection from '@/features/web/features/Home/components/HomeHeroSection'
import HomeQuotationDialog from '@/features/web/features/Home/components/HomeQuotationDialog'
import HomeBrandFilterStickySection from '@/features/web/features/Home/components/HomeBrandFilterStickySection'
import HomeCategoriesAndPromosGridSections from '@/features/web/features/Home/components/HomeCategoriesAndPromosGridSections'
import HomeFeaturedPromoGridSections from '@/features/web/features/Home/components/HomeFeaturedPromoGridSections'


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
                    : HomeHeroSection()
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
                await HomeQuotationDialog()
            }
        </main>
    `
}

export default HomePage