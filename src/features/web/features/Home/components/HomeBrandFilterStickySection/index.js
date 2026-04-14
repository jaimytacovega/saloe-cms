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
        ? await WebHook.useListCategoriesByBrandIds({ brandIds: [...filteredBrandsMap.keys()], ttl: 0 })
        : { data: [] }

    const { data: brandsByCategories } = isSearch
        ? await WebHook.useListBrandsByCategories({ categories, ttl: 10_000 })
        : { data: [] }

    const { data: allBrands } = await WebHook.useListBrandsByCategories({ categories: [], ttl: 10_000 })

    const { data: category_subCategories } = isSearch
        ? await WebHook.useListCategory_SubCategoriesByCategories({ categories, ttl: 10_000 })
        : { data: [] }

    const { data: promotions } = isSearch
        ? await WebHook.useListPromotionsByBrands({ brands: brandsByCategories.filter((brand) => filteredBrandsMap.has(brand.id)), ttl: 10_000 })
        : { data: [] }
    
    const subCategoryIdsMapByCategoryIdMap = isSearch
        ? await getSubCategoryIdsMapByCategoryIdMap({ category_subCategories })
        : new Map()
    
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