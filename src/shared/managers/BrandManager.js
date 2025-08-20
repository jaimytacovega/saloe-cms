import * as BrandRepository from '@/shared/repositories/BrandRepository'
import { AddBrandSchema, UpdateBrandSchema, DeleteBrandSchema } from '@/shared/schemas/BrandSchema'
import { prettifyError } from '@/shared/schemas/utils/utils'


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

        if (addResult.err) throw addResult.err
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

        if (updateResult.err) throw updateResult.err
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
            id,
            path,
        })

        if (removeResult.err) throw removeResult.err
        return removeResult
    } catch (err) {
        console.error(err)
        return { err }
    }
}


export {
    add,
    update,
    remove,
}