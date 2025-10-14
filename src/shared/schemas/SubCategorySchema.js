import { z } from 'zod'
import { FileSchema } from '@/shared/schemas/utils/FileSchema'
import { DateSchema } from '@/shared/schemas/utils/DateSchema'


const SubCategorySchema = z.object({
    id: z.string().min(1, 'El id es obligatorio').trim(),
    count: z.number(),
    name: z.string().min(1, 'El nombre es obligatorio').trim(),
    description: z.string().trim().optional(),
    image: FileSchema,
    categoryIds: z.array(z.string()).optional(),
    keywords: z.array(z.string()).nonempty('Las palabras clave son obligatorias'),
    seoKeywords: z.string().trim().optional(),
    createdAt: DateSchema,
    updatedAt: DateSchema.optional(),
})

const ListSubCategoryArraySchema = z.array(SubCategorySchema)

const AddSubCategorySchema = z.object({
    name: z.string().min(1, 'El nombre es obligatorio').trim(),
    description: z.string().trim().optional(),
    image: z.instanceof(File, 'La imagen es obligatoria'),
    categoryIds: z.array(z.string()).optional(),
    seoKeywords: z.string().trim().optional(),
    createdAt: z.date(),
    updatedAt: z.date(),
})

const UpdateSubCategorySchema = z.object({
    id: z.string().min(1, 'El id es obligatorio').trim(),
    name: z.string().min(1, 'El nombre es obligatorio').trim(),
    description: z.string().trim().optional(),
    image: z.union([z.instanceof(File), z.undefined()]),
    imagePath: z.string().min(1, 'La ruta es obligatoria').trim(),
    categoryIds: z.array(z.string()).optional(),
    seoKeywords: z.string().trim().optional(),
    keywords: z.array(z.string()).nonempty('Las palabras clave son obligatorias'),
    updatedAt: z.date(),
}).transform((data) => {
    if (data.image === undefined) {
        const { image, ...rest } = data
        return rest
    }
    return data
})

const DeleteSubCategorySchema = z.object({
    id: z.string().min(1, 'El id es obligatorio').trim(),
    imagePath: z.string().min(1, 'La ruta es obligatoria').trim(),
})

export {
    SubCategorySchema,
    ListSubCategoryArraySchema,
    AddSubCategorySchema,
    UpdateSubCategorySchema,
    DeleteSubCategorySchema,
}
