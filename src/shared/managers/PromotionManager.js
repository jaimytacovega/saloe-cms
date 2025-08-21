import * as PromotionManager from '@/shared/managers/PromotionManager'
import * as PromotionRepository from '@/shared/repositories/PromotionRepository'
import { 
    ListPromotionArraySchema, 
    PromotionSchema,
    AddPromotionSchema, 
    UpdatePromotionSchema, 
    DeletePromotionSchema, 
} from '@/shared/schemas/PromotionSchema'
import { prettifyError } from '@/shared/schemas/utils/utils'


const list = async ({
    source,
    filters,
    sorters,
    pageSize,
}) => {
    try{
        const listResult = await PromotionRepository.list({
            source,
            filters,
            sorters,
            pageSize,
        })

        if (listResult?.err) throw listResult.err

        const schemaResult = ListPromotionArraySchema.safeParse(listResult.data)
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
        const getResult = await PromotionRepository.get({
            source,
            collectionName: 'promotions',
            id,
        })

        console.log('getResult', getResult)
    
        if (getResult?.err) throw getResult.err
    
        const schemaResult = PromotionSchema.safeParse(getResult.data)
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
        console.log('data', data)
        const schemaResult = AddPromotionSchema.safeParse(data)
        if (!schemaResult.success) throw prettifyError({ error: schemaResult.error })

        const brandResult = await PromotionManager.get({
            source,
            id: schemaResult.data.brandId,
        })

        if (brandResult?.err) throw brandResult.err

        const addResult = await PromotionRepository.add({
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
        const schemaResult = UpdatePromotionSchema.safeParse(data)
        if (!schemaResult.success) throw prettifyError({ error: schemaResult.error })

        const updateResult = await PromotionRepository.update({
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
        const schemaResult = DeletePromotionSchema.safeParse({ id, path })
        if (!schemaResult.success) throw prettifyError({ error: schemaResult.error })

        const removeResult = await PromotionRepository.remove({
            source,
            id,
            path,
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