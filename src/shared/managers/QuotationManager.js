import * as QuotationRepository from '@/shared/repositories/QuotationRepository'
import { 
    ListQuotationArraySchema, 
    QuotationSchema,
    AddQuotationSchema, 
    UpdateQuotationSchema, 
    DeleteQuotationSchema, 
} from '@/shared/schemas/QuotationSchema'
import { prettifyError } from '@/shared/schemas/utils/utils'


const list = async ({
    source,
    filters,
    sorters,
    pageSize,
}) => {
    try{
        const listResult = await QuotationRepository.list({
            source,
            filters,
            sorters,
            pageSize,
        })
        if (listResult?.err) throw listResult.err

        const schemaResult = ListQuotationArraySchema.safeParse(listResult.data)
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
        const getResult = await QuotationRepository.get({
            source,
            id,
        })
    
        if (getResult?.err) throw getResult.err
    
        const schemaResult = QuotationSchema.safeParse(getResult.data)
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
        const schemaResult = AddQuotationSchema.safeParse(data)
        if (!schemaResult.success) throw prettifyError({ error: schemaResult.error })

        const addResult = await QuotationRepository.add({
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
        const schemaResult = UpdateQuotationSchema.safeParse(data)
        if (!schemaResult.success) throw prettifyError({ error: schemaResult.error })
                
        const updateResult = await QuotationRepository.update({
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
    attachmentPaths,
}) => {
    try{
        const schemaResult = DeleteQuotationSchema.safeParse({ id, attachmentPaths })
        if (!schemaResult.success) throw prettifyError({ error: schemaResult.error })

        const removeResult = await QuotationRepository.remove({
            source,
            id: schemaResult.data.id,
            attachmentPaths: schemaResult.data.attachmentPaths,
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