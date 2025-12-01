import WebStickySection from '@/features/web/components/WebStickySection'


const HomeBrandFilterStickySection = ({
    brands,
    categories,
    subCategoryIdsMapByCategoryIdMap,
    promotions,
}) => {
    return WebStickySection({
        brands,
        categories,
        subCategoryIdsMapByCategoryIdMap,
        promotions,
    })
}

export default HomeBrandFilterStickySection