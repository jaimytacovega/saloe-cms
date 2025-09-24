import * as CategoryRepository from '@/shared/repositories/CategoryRepository'
import { 
    ListCategoryArraySchema, 
    CategorySchema,
    AddCategorySchema, 
    UpdateCategorySchema, 
    DeleteCategorySchema, 
} from '@/shared/schemas/CategorySchema'
import { prettifyError } from '@/shared/schemas/utils/utils'


const list = async ({
    source,
    filters,
    sorters,
    pageSize,
}) => {
    try{
        const listResult = await CategoryRepository.list({
            source,
            filters,
            sorters,
            pageSize,
        })

        if (listResult?.err) throw listResult.err

        const schemaResult = ListCategoryArraySchema.safeParse(listResult.data)
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
        const getResult = await CategoryRepository.get({
            source,
            id,
        })

        if (getResult?.err) throw getResult.err

        const schemaResult = CategorySchema.safeParse(getResult.data)
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
        const schemaResult = AddCategorySchema.safeParse(data)
        if (!schemaResult.success) throw prettifyError({ error: schemaResult.error })

        const addResult = await CategoryRepository.add({
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
        const schemaResult = UpdateCategorySchema.safeParse(data)
        if (!schemaResult.success) throw prettifyError({ error: schemaResult.error })
                
        const updateResult = await CategoryRepository.update({
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
    catalogPaths,
}) => {
    try{
        const schemaResult = DeleteCategorySchema.safeParse({ id, path, catalogPaths })
        if (!schemaResult.success) throw prettifyError({ error: schemaResult.error })

        const removeResult = await CategoryRepository.remove({
            source,
            id,
            path: schemaResult.data.path,
            catalogPaths: schemaResult.data.catalogPaths,
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