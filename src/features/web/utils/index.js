import * as WebHook from '@/features/web/hooks/WebHook'


const MIN_BRANDS_LENGTH = 20
const MIN_CATEGORIES_LENGTH = 20
const MIN_SUB_CATEGORIES_LENGTH = 20
const MIN_PROMOTIONS_LENGTH = 20

const getSubCategoryIdsMapByCategoryIdMap = async ({
    category_subCategories,
}) => {
    const subCategoryIdsMapByCategoryIdMap = category_subCategories.reduce((acc, { categoryId, subCategoryId }) => {
        if (!acc.has(categoryId)) acc.set(categoryId, new Map())
        acc.get(categoryId).set(subCategoryId, subCategoryId)
        return acc
    }, new Map())

    await Promise.all(
        [...subCategoryIdsMapByCategoryIdMap.keys()].map(async (categoryId) => {
            const subCategoryIdsMap = subCategoryIdsMapByCategoryIdMap.get(categoryId)
            const subCategoryIds = [...subCategoryIdsMap.keys()]
            const { data: subCategories } = await WebHook.useListSubCategoriesByIds({ ids: subCategoryIds })

            subCategories.forEach((subCategory) => {
                subCategoryIdsMap.set(subCategory.id, subCategory)
            })
        })
    )

    return subCategoryIdsMapByCategoryIdMap
}

const getRegularAndFeaturedPromotions = ({
    promotions,
}) => {
    // TODO: Implement featured promotions
    return promotions.reduce((acc, promotion, index) => {
        // if (promotion.isFeatured) acc.featuredPromotions.push(promotion)
        if (index === promotions.length - 1) acc.featuredPromotions.push(promotion)
        else acc.regularPromotions.push(promotion)
        return acc
    }, { regularPromotions: [], featuredPromotions: [] })
}

export {
    MIN_BRANDS_LENGTH,
    MIN_CATEGORIES_LENGTH,
    MIN_SUB_CATEGORIES_LENGTH,
    MIN_PROMOTIONS_LENGTH,
    
    getSubCategoryIdsMapByCategoryIdMap,
    getRegularAndFeaturedPromotions,
}