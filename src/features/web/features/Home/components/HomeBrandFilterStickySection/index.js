import WebStickySection from '@/features/web/components/WebStickySection'

import * as WebHook from '@/features/web/hooks/WebHook'
import {
    getSubCategoryIdsMapByCategoryIdMap,
    getFilteredBrandsMapBySearchParams,
} from '@/features/web/utils'


const HomeBrandFilterStickySection = async ({
    isSearch = false,
    searchParams,
}) => {
    const filteredBrandsMap = getFilteredBrandsMapBySearchParams({ searchParams })

    const { data: categories } = isSearch
        ? { data: [] }
        : await WebHook.useListCategoriesByBrandIds({ brandIds: [...filteredBrandsMap.keys()], ttl: 10_000 })

    const { data: brandsByCategories } = isSearch
        ? { data: [] }
        : await WebHook.useListBrandsByCategories({ categories, ttl: 10_000 })

    const { data: allBrands } = await WebHook.useListBrandsByCategories({ categories: [], ttl: 10_000 })

    const { data: category_subCategories } = isSearch
        ? { data: [] }
        : await WebHook.useListCategory_SubCategoriesByCategories({ categories, ttl: 10_000 })

    const { data: promotions } = isSearch
        ? { data: [] }
        : await WebHook.useListPromotionsByBrands({ brands: brandsByCategories.filter((brand) => filteredBrandsMap.has(brand.id)), ttl: 10_000 })
    
    const subCategoryIdsMapByCategoryIdMap = isSearch
        ? new Map()
        : await getSubCategoryIdsMapByCategoryIdMap({
            category_subCategories,
        })
    
    return WebStickySection({
        id: 'HomeBrandFilterStickySection',
        brands: allBrands,
        categories,
        subCategoryIdsMapByCategoryIdMap,
        promotions,
        isSearch,
        filteredBrandsMap,
    })
}

export default HomeBrandFilterStickySection