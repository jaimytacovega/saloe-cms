import * as DatabaseService from '@/shared/services/DatabaseService'
import * as StorageService from '@/shared/services/StorageService'
import { Operators } from '@/shared/services/DatabaseService'

import * as Category_SubCategoryRepository from '@/shared/repositories/Category_SubCategoryRepository'


const storagePath = ({
    id = null,
    name,
}) => {
    return `/uploads/subCategories${id ? `/${id}` : ''}/${Date.now()}-${name}`
}

const list = ({
    source,
    filters,
    sorters,
    pageSize,
}) => {
    return DatabaseService.list({
        source,
        collectionName: 'subCategories',
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
                collectionName: 'subCategories',
                id,
            }),
            Category_SubCategoryRepository.list({
                source,
                filters: [{
                    field: 'subCategoryId',
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
        
        const categoryIds = categoryBySubCategoriesResult.value.data.map((categoryBySubCategory) => categoryBySubCategory.categoryId)
        const data = {
            ...getResult.value.data,
            categoryIds,
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
                const storageResult = await StorageService.add({
                    source,
                    file: data.image,
                    path: storagePath({ name: data.image.name }),
                })
                if (storageResult?.err) throw storageResult.err

                const counterTx = await DatabaseService.getWithTransaction({
                    source,
                    tx,
                    collectionName: 'counters',
                    id: 'subCategories',
                })

                const count = counterTx?.data 
                    ? counterTx.data.count + 1 
                    : 1

                const subCategoryTx = await DatabaseService.getWithTransaction({
                    source,
                    tx,
                    collectionName: 'subCategories',
                })

                const { categoryIds, ...rest } = data

                const subCategory = {
                    ...rest,
                    image: storageResult.data,
                    count,
                }

                await Promise.all(
                    categoryIds.map(async (categoryId) => {
                        const categoryBySubCategoryTx = await DatabaseService.getWithTransaction({
                            source,
                            tx,
                            collectionName: 'category_subCategories',
                            id: `${categoryId}_${subCategoryTx.ref.id}`,
                        })

                        if (!categoryBySubCategoryTx?.data) {
                            await DatabaseService.addWithTransaction({
                                source,
                                tx,
                                ref: categoryBySubCategoryTx.ref,
                                data: { categoryId, subCategoryId: subCategoryTx.ref.id },
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
                    ref: subCategoryTx.ref,
                    data: subCategory,
                })
                
                return { 
                    id: subCategoryTx.ref.id,
                    ...subCategory, 
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
                    const storageResult = await StorageService.update({
                        source,
                        file: data.image,
                        path: storagePath({ id: data.id, name: data.image.name }),
                        oldPath: data.oldPath,
                    })
                
                    if (storageResult?.err) throw storageResult.err
                    data.image = storageResult.data
                }
                
                delete data.oldPath

                const subCategoryTx = await DatabaseService.getWithTransaction({
                    source,
                    tx,
                    collectionName: 'subCategories',
                    id: data.id,
                })
                
                const { categoryIds, ...subCategory } = data

                const categoryBySubcategoriesResult = await Category_SubCategoryRepository.list({
                    source,
                    filters: [{
                        field: 'subCategoryId',
                        operator: Operators.EqualTo,
                        value: data.id,
                    }],
                })

                const categoryBySubcategories = categoryBySubcategoriesResult.data

                const categoryBySubcategoriesToRemove = categoryBySubcategories.filter((categoryBySubcategory) => !categoryIds.includes(categoryBySubcategory.categoryId))                
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

                const categoryIdsToAdd = categoryIds.filter((categoryId) => !categoryBySubcategories.some((categoryBySubcategory) => categoryBySubcategory.categoryId === categoryId))
                
                await Promise.all([
                    ...categoryBySubcategoriesToRemoveTxs.map((categoryBySubcategoriesToRemoveTx) => {
                        return tx.delete(categoryBySubcategoriesToRemoveTx.ref)
                    }),
                    ...categoryIdsToAdd.map(async (categoryIdToAdd) => {
                        const categoryBySubCategoryToAddTx = await DatabaseService.getWithTransaction({
                            source,
                            tx,
                            collectionName: 'category_subCategories',
                            id: `${categoryIdToAdd}_${subCategoryTx.ref.id}`,
                        })

                        if (!categoryBySubCategoryToAddTx?.data) {      
                            return DatabaseService.addWithTransaction({
                                source,
                                tx,
                                ref: categoryBySubCategoryToAddTx.ref,
                                collectionName: 'category_subCategories',
                                data: { categoryId: categoryIdToAdd, subCategoryId: subCategoryTx.ref.id },
                            })
                        }
                    }),
                    DatabaseService.updateWithTransaction({
                        source,
                        tx,
                        ref: subCategoryTx.ref,
                        data: subCategory,
                    }),
                ])

                return { 
                    id: subCategoryTx.ref.id,
                    ...subCategory, 
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
    path,
}) => {
    const removeResult = await DatabaseService.onTransaction({
        source,
        transaction: async (tx) => {
            try{
                const storageResult = await StorageService.remove({
                    source,
                    path,
                })
            
                if (storageResult?.err) throw storageResult

                const subCategoryTx = await DatabaseService.getWithTransaction({
                    source,
                    tx,
                    collectionName: 'subCategories',
                    id,
                })
                
                const categoryBySubcategoriesResult = await Category_SubCategoryRepository.list({
                    source,
                    filters: [{
                        field: 'subCategoryId',
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

                return Promise.all(
                    [
                        subCategoryTx, 
                        ...categoryBySubcategoriesTxs,
                    ].map((txToRemove) => {
                        return tx.delete(txToRemove.ref)
                    })
                )
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