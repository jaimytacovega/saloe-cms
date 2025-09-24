import * as ProductRepository from '@/shared/repositories/ProductRepository'
import { 
    ListProductArraySchema, 
    ProductSchema,
    AddProductSchema, 
    UpdateProductSchema, 
    DeleteProductSchema, 
} from '@/shared/schemas/ProductSchema'
import { prettifyError } from '@/shared/schemas/utils/utils'


const list = async ({
    source,
    filters,
    sorters,
    pageSize,
}) => {
    try{
        const listResult = await ProductRepository.list({
            source,
            filters,
            sorters,
            pageSize,
        })

        if (listResult?.err) throw listResult.err

        const schemaResult = ListProductArraySchema.safeParse(listResult.data)
        console.log('schemaResult =', schemaResult)
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
        const getResult = await ProductRepository.get({
            source,
            id,
        })
    
        if (getResult?.err) throw getResult.err
    
        const schemaResult = ProductSchema.safeParse(getResult.data)
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
        const schemaResult = AddProductSchema.safeParse(data)
        if (!schemaResult.success) throw prettifyError({ error: schemaResult.error })

        const addResult = await ProductRepository.add({
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
        const schemaResult = UpdateProductSchema.safeParse(data)
        console.log('schemaResult =', schemaResult)
        if (!schemaResult.success) throw prettifyError({ error: schemaResult.error })
                
        const updateResult = await ProductRepository.update({
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

// const remove = async ({
//     source,
//     id,
//     path,
// }) => {
//     try{
//         const schemaResult = DeleteProductSchema.safeParse({ id, path })
//         if (!schemaResult.success) throw prettifyError({ error: schemaResult.error })

//         const removeResult = await ProductRepository.remove({
//             source,
//             id: schemaResult.data.id,
//             path: schemaResult.data.path,
//         })

//         if (removeResult?.err) throw removeResult.err
//         return removeResult
//     } catch (err) {
//         console.error(err)
//         return { err }
//     }
// }


export {
    list,
    get,
    add,
    update,
    // remove,
}