import WebStickySection from '@/features/web/components/WebStickySection'

import * as WebHook from '@/features/web/hooks/WebHook'
import {
    getSubCategoryIdsMapByCategoryIdMap,
    getRegularAndFeaturedPromotions,
} from '@/features/web/utils'


const HomeBrandFilterStickySection = async () => {
    const { data: categories } = await WebHook.useListCategories({ ttl: 10_000 })
    const { data: brands } = await WebHook.useListBrandsByCategories({ categories, ttl: 10_000 })
    const { data: category_subCategories } = await WebHook.useListCategory_SubCategoriesByCategories({ categories, ttl: 10_000 })
    const { data: promotions } = await WebHook.useListPromotionsByBrands({ brands, ttl: 10_000 })
    
    const subCategoryIdsMapByCategoryIdMap = await getSubCategoryIdsMapByCategoryIdMap({
        category_subCategories,
    })
    
    const { regularPromotions } = getRegularAndFeaturedPromotions({ promotions})

    return WebStickySection({
        brands,
        categories,
        subCategoryIdsMapByCategoryIdMap,
        promotions: regularPromotions,
    })
}

export default HomeBrandFilterStickySection