import { z } from 'zod'
import { FileSchema } from '@/shared/schemas/utils/FileSchema'
import { DateSchema } from '@/shared/schemas/utils/DateSchema'


const Category_SubCategorySchema = z.object({
    id: z.string().min(1, 'El id es obligatorio').trim(),
    categoryId: z.string().min(1, 'El id de la categoría es obligatorio').trim(),
    subCategoryId: z.string().min(1, 'El id de la subcategoría es obligatorio').trim(),
})

const ListCategory_SubCategoryArraySchema = z.array(Category_SubCategorySchema)

export {
    Category_SubCategorySchema,
    ListCategory_SubCategoryArraySchema,
}