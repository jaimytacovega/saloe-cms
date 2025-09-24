import * as BrandRepository from '@/shared/repositories/BrandRepository'
import { 
    ListBrandArraySchema, 
    BrandSchema,
    AddBrandSchema, 
    UpdateBrandSchema, 
    DeleteBrandSchema, 
} from '@/shared/schemas/BrandSchema'
import { prettifyError } from '@/shared/schemas/utils/utils'


const list = async ({
    source,
    filters,
    sorters,
    pageSize,
}) => {
    try{
        const listResult = await BrandRepository.list({
            source,
            filters,
            sorters,
            pageSize,
        })

        if (listResult?.err) throw listResult.err

        const schemaResult = ListBrandArraySchema.safeParse(listResult.data)
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
        const getResult = await BrandRepository.get({
            source,
            id,
        })
    
        if (getResult?.err) throw getResult.err
    
        const schemaResult = BrandSchema.safeParse(getResult.data)
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
        const schemaResult = AddBrandSchema.safeParse(data)
        if (!schemaResult.success) throw prettifyError({ error: schemaResult.error })

        const addResult = await BrandRepository.add({
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
        const schemaResult = UpdateBrandSchema.safeParse(data)
        if (!schemaResult.success) throw prettifyError({ error: schemaResult.error })
                
        const updateResult = await BrandRepository.update({
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
        const schemaResult = DeleteBrandSchema.safeParse({ id, path })
        if (!schemaResult.success) throw prettifyError({ error: schemaResult.error })

        const removeResult = await BrandRepository.remove({
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