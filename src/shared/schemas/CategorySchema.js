import { z } from 'zod'
import { FileSchema } from '@/shared/schemas/utils/FileSchema'
import { DateSchema } from '@/shared/schemas/utils/DateSchema'


const CategorySchema = z.object({
    id: z.string().min(1, 'El id es obligatorio').trim(),
    count: z.number(),
    name: z.string().min(1, 'El nombre es obligatorio').trim(),
    description: z.string().trim().optional(),
    image: FileSchema,
    subCategoryIds: z.array(z.string()).optional(),
    brandIds: z.array(z.string()).optional(),
    promotionIds: z.array(z.string()).optional(),
    catalogs: z.array(FileSchema).optional(),
    keywords: z.array(z.string()).nonempty('Las palabras clave son obligatorias'),
    createdAt: DateSchema,
    updatedAt: DateSchema.optional(),
})

const ListCategoryArraySchema = z.array(CategorySchema)

const AddCategorySchema = z.object({
    name: z.string().min(1, 'El nombre es obligatorio').trim(),
    description: z.string().trim().optional(),
    image: z.instanceof(File, 'La imagen es obligatoria'),
    subCategoryIds: z.array(z.string()).optional(),
    brandIds: z.array(z.string()).optional(),
    promotionIds: z.array(z.string()).optional(),
    catalogs: z.array(z.instanceof(File)).optional(),
    keywords: z.array(z.string()).nonempty('Las palabras clave son obligatorias'),
    createdAt: DateSchema,
    updatedAt: DateSchema,
})  

const UpdateCategorySchema = z.object({
    id: z.string().min(1, 'El id es obligatorio').trim(),
    name: z.string().min(1, 'El nombre es obligatorio').trim(),
    description: z.string().trim().optional(),
    image: z.union([z.instanceof(File), z.undefined()]),
    oldPath: z.string().min(1, 'La ruta es obligatoria').trim(),
    subCategoryIds: z.array(z.string()).optional(),
    brandIds: z.array(z.string()).optional(),
    promotionIds: z.array(z.string()).optional(),
    catalogs: z.array(z.instanceof(File)).optional(),
    catalogsToKeep: z.array(FileSchema).optional(),
    catalogsToRemove: z.array(z.string()).optional(),
    keywords: z.array(z.string()).nonempty('Las palabras clave son obligatorias'),
    updatedAt: DateSchema,
}).transform((data) => {
    if (data.image === undefined) {
        const { image, ...rest } = data
        return rest
    }
    return data
})

const DeleteCategorySchema = z.object({
    id: z.string().min(1, 'El id es obligatorio').trim(),
    path: z.string().min(1, 'La ruta es obligatoria').trim(),
    catalogPaths: z.array(z.string().trim()).optional(),
})

export {
    CategorySchema,
    ListCategoryArraySchema,
    AddCategorySchema,
    UpdateCategorySchema,
    DeleteCategorySchema,
}
