import * as Category_SubCategoryRepository from '@/shared/repositories/Category_SubCategoryRepository'
import { 
    ListCategory_SubCategoryArraySchema, 
} from '@/shared/schemas/Category_SubCategorySchema'
import { prettifyError } from '@/shared/schemas/utils/utils'


const list = async ({
    source,
    filters,
    sorters,
    pageSize,
}) => {
    try{
        const listResult = await Category_SubCategoryRepository.list({
            source,
            filters,
            sorters,
            pageSize,
        })
        if (listResult?.err) throw listResult.err

        const schemaResult = ListCategory_SubCategoryArraySchema.safeParse(listResult.data)
        if (!schemaResult.success) throw prettifyError({ error: schemaResult.error })
            
        return { data: schemaResult.data }
    } catch (err) {
        console.error(err)
        return { err }
    }
}

export {
    list,
}