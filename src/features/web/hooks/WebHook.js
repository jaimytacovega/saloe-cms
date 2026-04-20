import { useQuery } from '@/shared/lib/@saloe-hook'

import * as BrandHook from '@/shared/hooks/BrandHook'
import * as CategoryHook from '@/shared/hooks/CategoryHook'
import * as SubCategoryHook from '@/shared/hooks/SubCategoryHook'
import * as PromotionHook from '@/shared/hooks/PromotionHook'
import * as Category_SubCategoryHook from '@/shared/hooks/Category_SubCategoryHook'
import * as ProductManager from '@/shared/managers/ProductManager'
import { slugifySeoSlug } from '@/shared/schemas/utils/utils'

import { Source } from '@/shared/utils/constants'
import { queryBySearchParams, OperatorSymbols, Operators } from '@/shared/services/DatabaseService'


const useListCategories = ({
    ttl,
}) => {
    return useQuery({
        queryKey: ['web', 'listCategories'],
        queryFn: async () => {
            const searchParams = new URLSearchParams()
            searchParams.set('page', '1')
            searchParams.set('pageSize', '20')
            searchParams.set('sort', 'updatedAt:desc')

            const { data: categories } = await queryBySearchParams({
                query: ({ listArguments }) => {
                    return CategoryHook.useList({
                        source: Source.FIREBASE,
                        ...listArguments,
                        ttl: 0,
                    })
                },
                searchParams,
            })

            return { data: categories }
        },
        ttl,
    })
}

const useListCategoriesByBrandIds = ({
    brandIds,
    ttl,
}) => {
    return useQuery({
        queryKey: ['web', 'listCategoriesByBrandIds', brandIds.join(',')],
        queryFn: async () => {
            const searchParams = new URLSearchParams()
            searchParams.set('page', '1')
            searchParams.set('pageSize', '20')
            searchParams.set('sort', 'updatedAt:desc')
            if (brandIds.length > 0) searchParams.set('filter', `brandIds:${OperatorSymbols.ContainsAny.at(0)}${brandIds.join(';')}${OperatorSymbols.ContainsAny.at(1)}`)

            const { data: categories } = await queryBySearchParams({
                query: ({ listArguments }) => {
                    return CategoryHook.useList({
                        source: Source.FIREBASE,
                        ...listArguments,
                        ttl: 0,
                    })
                },
                searchParams,
            })

            return { data: categories }
        },
        ttl,
    })
}

const useListBrandsByCategories = ({
    categories,
    ttl,
}) => {
    return useQuery({
        queryKey: ['web', 'getBrandsByCategories', categories.map((category) => category.id).join(',')],
        queryFn: async () => {
            const ids = [...categories.reduce((acc, category) => {
                category.brandIds.forEach((brandId) => {
                    if (Boolean(brandId)) acc.add(brandId)
                })
                return acc
            }, new Set())]
        
            const searchParams = new URLSearchParams()
            if (ids.length > 0) searchParams.set('filter', `id:${OperatorSymbols.In.at(0)}${ids.join(';')}${OperatorSymbols.In.at(1)}`)
        
            const { data: brands } = await queryBySearchParams({
                query: ({ listArguments }) => {
                    return BrandHook.useList({
                        source: Source.FIREBASE,
                        ...listArguments,
                        ttl: 0,
                    })
                },
                searchParams,
            })
        
            return { data: brands }
        },
        ttl,
    })
}

const useListCategory_SubCategoriesByCategories = ({
    categories,
    ttl,
}) => {
    return useQuery({
        queryKey: ['web', 'listCategory_SubCategoriesByCategories', categories.map((category) => category.id).join(',')],
        queryFn: async () => {
            const categoryIds = [...categories.map((category) => category.id)]

            const searchParams = new URLSearchParams()
            searchParams.set('filter', `categoryId:${OperatorSymbols.In.at(0)}${categoryIds.join(';')}${OperatorSymbols.In.at(1)}`)

            const { data: category_subCategories } = await queryBySearchParams({
                query: ({ listArguments }) => {
                    return Category_SubCategoryHook.useList({
                        source: Source.FIREBASE,
                        ...listArguments,
                        ttl: 0,
                    })
                },
                searchParams,
            })

            return { data: category_subCategories }
        },
        ttl,
    })
}

const useListSubCategoriesByIds = ({
    ids,
    ttl,
}) => {
    return useQuery({
        queryKey: ['web', 'listSubCategoriesByIds', ids.join(',')],
        queryFn: async () => {
            const searchParams = new URLSearchParams()
            searchParams.set('filter', `id:${OperatorSymbols.In.at(0)}${ids.join(';')}${OperatorSymbols.In.at(1)}`)

            const { data: subCategories } = await queryBySearchParams({
                query: ({ listArguments }) => {
                    return SubCategoryHook.useList({
                        source: Source.FIREBASE,
                        ...listArguments,
                        ttl: 0,
                    })
                },
                searchParams,
            })

            return { data: subCategories }
        },
        ttl,
    })
}

const useGetSubCategoryById = ({
    id,
    ttl,
}) => {
    return useQuery({
        queryKey: ['web', 'getSubCategoryById', id],
        queryFn: async () => {
            const { data: subCategory } = await SubCategoryHook.useGet({
                source: Source.FIREBASE,
                id,
                ttl: 0,
            })

            return { data: subCategory }
        },
        ttl,
    })
}

const useListPromotionsByBrands = ({
    brands,
    ttl,
}) => {
    const brandIds = brands.map((brand) => brand.id)

    return useQuery({
        queryKey: ['web', 'listPromotionsByBrands', brandIds.join(',')],
        queryFn: async () => {
            const searchParams = new URLSearchParams()
            if (brandIds.length > 0) searchParams.set('filter', `brandId:${OperatorSymbols.In.at(0)}${brandIds.join(';')}${OperatorSymbols.In.at(1)}`)

            const { data: promotions } = await queryBySearchParams({
                query: ({ listArguments }) => {
                    return PromotionHook.useList({
                        source: Source.FIREBASE,
                        ...listArguments,
                        ttl: 0,
                    })
                },
                searchParams,
            })

            return { data: promotions }
        },
        ttl,
    })
}

const useGetProductById = ({
    id,
    ttl,
}) => {
    return useQuery({
        queryKey: ['web', 'getProductById', id],
        queryFn: () => ProductManager.get({
            source: Source.FIREBASE,
            id,
        }),
        ttl,
    })
}

/**
 * `slug` is a URL segment; it is normalized with `slugifySeoSlug` before querying `seoSlug`.
 */
const useGetProductBySlug = ({
    slug,
    ttl,
}) => {
    return useQuery({
        queryKey: ['web', 'getProductBySlug', slug],
        queryFn: async () => {
            const normalized = slugifySeoSlug(slug)
            if (!normalized) {
                return { err: 'product-not-found' }
            }

            const listResult = await ProductManager.list({
                source: Source.FIREBASE,
                filters: [{
                    field: 'seoSlug',
                    operator: Operators.EqualTo,
                    value: normalized,
                }],
                pageSize: 2,
            })
            if (listResult?.err) throw listResult.err

            const product = listResult.data?.at(0)
            if (!product) {
                return { err: 'product-not-found' }
            }

            return { data: product }
        },
        ttl,
    })
}

export {
    useListCategories,
    useListCategoriesByBrandIds,

    useListBrandsByCategories,

    useListCategory_SubCategoriesByCategories,

    useListSubCategoriesByIds,
    useGetSubCategoryById,

    useListPromotionsByBrands,

    useGetProductById,
    useGetProductBySlug,
}