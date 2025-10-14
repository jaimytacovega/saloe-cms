import * as DatabaseService from '@/shared/services/DatabaseService'
import * as StorageService from '@/shared/services/StorageService'

import * as Category_SubCategoryRepository from '@/shared/repositories/Category_SubCategoryRepository'
import { Operators } from '@/shared/services/DatabaseService'
import { keywords, getCMSCorrelative } from '@/shared/utils/utils'


const storagePath = ({
    id = null,
    name,
}) => {
    return `/uploads/categories${id ? `/${id}` : ''}/${Date.now()}-${name}`
}

const list = ({
    source,
    filters,
    sorters,
    pageSize,
}) => {
    return DatabaseService.list({
        source,
        collectionName: 'categories',
        filters,
        sorters,
        pageSize,
    })
}

const get = async ({
    source,
    id,
}) => {
    try{
        const [
            getResult,
            categoryBySubCategoriesResult,
        ] = await Promise.allSettled([
            DatabaseService.get({
                source,
                collectionName: 'categories',
                id,
            }),
            Category_SubCategoryRepository.list({
                source,
                filters: [{
                    field: 'categoryId',
                    operator: Operators.EqualTo,
                    value: id,
                }],
            }),
        ])

        if (
            getResult.status === 'rejected' ||
            getResult.value?.err
        ) throw getResult.reason ?? getResult.value.err

        if (
            categoryBySubCategoriesResult.status === 'rejected' ||
            categoryBySubCategoriesResult.value?.err
        ) throw categoryBySubCategoriesResult.reason ?? categoryBySubCategoriesResult.value.err

        const subCategoryIds = categoryBySubCategoriesResult.value.data.map((categoryBySubCategory) => categoryBySubCategory.subCategoryId)
        const data = {
            ...getResult.value.data,
            subCategoryIds,
        }
    
        return { data }
    } catch (err) {
        return { err }
    }
}

const add = async ({
    source,
    data,
}) => {
    const addResult = await DatabaseService.onTransaction({
        source,
        transaction: async (tx) => {
            try{
                const imageStorageResult = await StorageService.add({
                    source,
                    file: data.image,
                    filePath: storagePath({ name: data.image.name }),
                })
                if (imageStorageResult?.err) throw imageStorageResult.err
                
                const catalogsStorageResults = await StorageService.addMultiple({
                    source,
                    files: data.catalogs,
                    paths: data.catalogs.map((catalog) => storagePath({ name: catalog.name })),
                })
                if (catalogsStorageResults?.err) throw catalogsStorageResults.err

                const counterTx = await DatabaseService.getWithTransaction({
                    source,
                    tx,
                    collectionName: 'counters',
                    id: 'categories',
                })

                const count = counterTx?.data 
                    ? counterTx.data.count + 1 
                    : 1

                const categoryTx = await DatabaseService.getWithTransaction({
                    source,
                    tx,
                    collectionName: 'categories',
                })

                const correlative = getCMSCorrelative({ collectionName: 'categories', count })

                const { subCategoryIds, ...rest } = data

                const category = {
                    ...rest,
                    image: imageStorageResult.data,
                    catalogs: catalogsStorageResults.data,
                    count,
                    keywords: keywords({ 
                        keys: [
                            correlative,
                            data.name,
                            data.description,
                        ] 
                    }),
                }
                
                await Promise.all(
                    subCategoryIds.map(async (subCategoryId) => {
                        const categoryBySubCategoryTx = await DatabaseService.getWithTransaction({
                            source,
                            tx,
                            collectionName: 'category_subCategories',
                            id: `${categoryTx.ref.id}_${subCategoryId}`,
                        })

                        if (!categoryBySubCategoryTx?.data) {
                            await DatabaseService.addWithTransaction({
                                source,
                                tx,
                                ref: categoryBySubCategoryTx.ref,
                                data: { categoryId: categoryTx.ref.id, subCategoryId },
                            })
                        }
                    })
                )

                Boolean(counterTx?.data)
                    ? await DatabaseService.updateWithTransaction({
                        source,
                        tx,
                        ref: counterTx.ref,
                        data: { count },
                    })
                    : await DatabaseService.addWithTransaction({
                        source,
                        tx,
                        ref: counterTx.ref,
                        data: { count },
                    })

                await DatabaseService.addWithTransaction({
                    source,
                    tx,
                    ref: categoryTx.ref,
                    data: category,
                })
                
                return { 
                    id: categoryTx.ref.id,
                    ...category, 
                }
            }catch(err){
                return Promise.reject(err)
            }
        }
    })

    return addResult
}

const update = async({
    source,
    data,
}) => {
    const updateResult = await DatabaseService.onTransaction({
        source,
        transaction: async (tx) => {
            try{
                if (Boolean(data.image)) {
                    const imageStorageResult = await StorageService.update({
                        source,
                        file: data.image,
                        newFilePath: storagePath({ id: data.id, name: data.image.name }),
                        currentFilePath: data.imagePath,
                    })
                
                    if (imageStorageResult?.err) throw imageStorageResult.err
                    data.image = imageStorageResult.data
                }
                
                delete data.imagePath

                if (Boolean(data.catalogsToRemove)) {
                    const catalogsStorageResults = await StorageService.removeMultiple({
                        source,
                        filePaths: data.catalogsToRemove,
                    })
            
                    if (catalogsStorageResults?.err) throw catalogsStorageResults.err
                }
            
                delete data.catalogsToRemove

                const addCatalogsStorageResults = await StorageService.addMultiple({
                    source,
                    files: data.catalogs,
                    paths: data.catalogs.map((catalog) => storagePath({ id: data.id, name: catalog.name })),
                })
                if (addCatalogsStorageResults?.err) throw addCatalogsStorageResults.err

                data.catalogs = [
                    ...data.catalogsToKeep,
                    ...addCatalogsStorageResults.data,
                ]
            
                delete data.catalogsToKeep

                const categoryTx = await DatabaseService.getWithTransaction({
                    source,
                    tx,
                    collectionName: 'categories',
                    id: data.id,
                })

                const { subCategoryIds, ...category } = data

                const categoryBySubcategoriesResult = await Category_SubCategoryRepository.list({
                    source,
                    filters: [{
                        field: 'categoryId',
                        operator: Operators.EqualTo,
                        value: data.id,
                    }],
                })

                const categoryBySubcategories = categoryBySubcategoriesResult.data

                const categoryBySubcategoriesToRemove = categoryBySubcategories.filter((categoryBySubcategory) => !subCategoryIds.includes(categoryBySubcategory.subCategoryId))
                const categoryBySubcategoriesToRemoveTxs = await Promise.all(
                    categoryBySubcategoriesToRemove.map((categoryBySubcategoryToRemove) => {
                        return DatabaseService.getWithTransaction({
                            source,
                            tx,
                            collectionName: 'category_subCategories',
                            id: categoryBySubcategoryToRemove.id,
                        })
                    })
                )

                const subCategoryIdsToAdd = subCategoryIds.filter((subCategoryId) => !categoryBySubcategories.some((categoryBySubcategory) => categoryBySubcategory.subCategoryId === subCategoryId))

                await Promise.all([
                    ...categoryBySubcategoriesToRemoveTxs.map((categoryBySubcategoriesToRemoveTx) => {
                        return tx.delete(categoryBySubcategoriesToRemoveTx.ref)
                    }),
                    ...subCategoryIdsToAdd.map(async (subCategoryIdToAdd) => {
                        const categoryBySubCategoryToAddTx = await DatabaseService.getWithTransaction({
                            source,
                            tx,
                            collectionName: 'category_subCategories',
                            id: `${categoryTx.ref.id}_${subCategoryIdToAdd}`,
                        })

                        if (!categoryBySubCategoryToAddTx?.data) {
                            await DatabaseService.addWithTransaction({
                                source,
                                tx,
                                ref: categoryBySubCategoryToAddTx.ref,
                                data: { categoryId: categoryTx.ref.id, subCategoryId: subCategoryIdToAdd },
                            })
                        }
                    }),
                    DatabaseService.updateWithTransaction({
                        source,
                        tx,
                        ref: categoryTx.ref,
                        data: category,
                    }),
                ])

                return { 
                    id: categoryTx.ref.id,
                    ...category, 
                }
            }catch(err){
                return Promise.reject(err)
            }
        }
    })

    return updateResult
}

const remove = async ({
    source,
    id,
    imagePath,
    catalogPaths,
}) => {
    const removeResult = await DatabaseService.onTransaction({
        source,
        transaction: async (tx) => {
            try{
                const removeFilesResults = await StorageService.removeMultiple({
                    source,
                    filePaths: [imagePath, ...catalogPaths],
                })
            
                if (removeFilesResults?.err) throw removeFilesResults.err

                const categoryTx = await DatabaseService.getWithTransaction({
                    source,
                    tx,
                    collectionName: 'categories',
                    id,
                })
                
                const categoryBySubcategoriesResult = await Category_SubCategoryRepository.list({
                    source,
                    filters: [{
                        field: 'categoryId',
                        operator: Operators.EqualTo,
                        value: id,
                    }],
                })

                const categoryBySubcategoriesTxs = await Promise.all(
                    categoryBySubcategoriesResult.data.map((categoryBySubcategory) => {
                        return DatabaseService.getWithTransaction({
                            source,
                            tx,
                            collectionName: 'category_subCategories',
                            id: categoryBySubcategory.id,
                        })
                    })
                )

                await Promise.all(
                    [
                        categoryTx,
                        ...categoryBySubcategoriesTxs,
                    ].map((txToRemove) => {
                        return tx.delete(txToRemove.ref)
                    })
                )

                return {
                    data: { id },
                }
            }catch(err){
                return Promise.reject(err)
            }
        }
    })

    return removeResult
}

export {
    list,
    get,
    add,
    update,
    remove,
}