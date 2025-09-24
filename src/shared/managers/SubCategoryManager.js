import * as SubCategoryRepository from '@/shared/repositories/SubCategoryRepository'
import * as Category_SubCategoryRepository from '@/shared/repositories/Category_SubCategoryRepository'
import { Operators } from '@/shared/services/DatabaseService'

import { 
    ListSubCategoryArraySchema, 
    SubCategorySchema,
    AddSubCategorySchema, 
    UpdateSubCategorySchema, 
    DeleteSubCategorySchema, 
} from '@/shared/schemas/SubCategorySchema'
import { prettifyError } from '@/shared/schemas/utils/utils'


const list = async ({
    source,
    filters,
    sorters,
    pageSize,
}) => {
    try{
        const listResult = await SubCategoryRepository.list({
            source,
            filters,
            sorters,
            pageSize,
        })
        
        if (listResult?.err) throw listResult.err

        const schemaResult = ListSubCategoryArraySchema.safeParse(listResult.data)
        if (!schemaResult.success) throw prettifyError({ error: schemaResult.error })
            
        return { data: schemaResult.data }
    } catch (err) {
        console.error(err)
        return { err }
    }
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
            SubCategoryRepository.get({
                source,
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
    
        const schemaResult = SubCategorySchema.safeParse(data)
        if (!schemaResult.success) throw prettifyError({ error: schemaResult.error })
    
        return { data: schemaResult.data }
    } catch (err) {
        console.error(err)
        return { err }
    }
}

const add = async ({
    source,
    data,
}) => {
    try {
        const schemaResult = AddSubCategorySchema.safeParse(data)
        if (!schemaResult.success) throw prettifyError({ error: schemaResult.error })

        const addResult = await SubCategoryRepository.add({
            source,
            data: schemaResult.data,
        })

        if (addResult?.err) throw addResult.err
        return addResult
    } catch (err) {
        console.error(err)
        return { err }
    }
}

const update = async ({
    source,
    data,
}) => {
    try {
        const schemaResult = UpdateSubCategorySchema.safeParse(data)
        if (!schemaResult.success) throw prettifyError({ error: schemaResult.error })
                
        const updateResult = await SubCategoryRepository.update({
            source,
            data: schemaResult.data,
        })

        if (updateResult?.err) throw updateResult.err
        return updateResult
    } catch (err) {
        console.error(err)
        return { err }
    }
}

const remove = async ({
    source,
    id,
    path,
}) => {
    try{
        const schemaResult = DeleteSubCategorySchema.safeParse({ id, path })
        if (!schemaResult.success) throw prettifyError({ error: schemaResult.error })

        const removeResult = await SubCategoryRepository.remove({
            source,
            id: schemaResult.data.id,
            path: schemaResult.data.path,
        })

        if (removeResult?.err) throw removeResult.err
        return removeResult
    } catch (err) {
        console.error(err)
        return { err }
    }
}


export {
    list,
    get,
    add,
    update,
    remove,
}