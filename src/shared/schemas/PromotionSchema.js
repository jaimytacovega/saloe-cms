import { z } from 'zod'
import { FileSchema } from '@/shared/schemas/utils/FileSchema'


const PromotionSchema = z.object({
    id: z.string().min(1, 'El id es obligatorio').trim(),
    name: z.string().min(1, 'El nombre es obligatorio').trim(),
    description: z.string().trim().optional(),
    image: FileSchema,
    brandId: z.string().min(1, 'El id de la marca es obligatorio').trim(),
    keywords: z.array(z.string()).nonempty('Las palabras clave son obligatorias'),
    createdAt: z.date(),
    updatedAt: z.date().optional(),
})

const ListPromotionArraySchema = z.array(PromotionSchema)

const AddPromotionSchema = z.object({
    name: z.string().min(1, 'El nombre es obligatorio').trim(),
    description: z.string().trim().optional(),
    image: z.instanceof(File, 'La imagen es obligatoria'),
    brandId: z.string().min(1, 'El id de la marca es obligatorio').trim(),
    keywords: z.array(z.string()).nonempty('Las palabras clave son obligatorias'),
    createdAt: z.date(),
})

const UpdatePromotionSchema = z.object({
    id: z.string().min(1, 'El id es obligatorio').trim(),
    name: z.string().min(1, 'El nombre es obligatorio').trim(),
    description: z.string().trim().optional(),
    image: z.union([z.instanceof(File), z.undefined()]),
    oldPath: z.string().min(1, 'La ruta es obligatoria').trim(),
    brandId: z.string().min(1, 'El id de la marca es obligatorio').trim(),
    keywords: z.array(z.string()).nonempty('Las palabras clave son obligatorias'),
    updatedAt: z.date(),
}).transform((data) => {
    if (data.image === undefined) {
        const { image, ...rest } = data
        return rest
    }
    return data
})

const DeletePromotionSchema = z.object({
    id: z.string().min(1, 'El id es obligatorio').trim(),
    path: z.string().min(1, 'La ruta es obligatoria').trim(),
})

export {
    PromotionSchema,
    ListPromotionArraySchema,
    AddPromotionSchema,
    UpdatePromotionSchema,
    DeletePromotionSchema,
}
