import { z } from 'zod'
import { FileSchema } from '@/shared/schemas/utils/FileSchema'
import { DateSchema } from '@/shared/schemas/utils/DateSchema'


const BannerSchema = z.object({
    id: z.string().min(1, 'El id es obligatorio').trim(),
    count: z.number(),
    pretitle: z.string().trim().optional(),
    title: z.string().min(1, 'El título es obligatorio').trim(),
    description: z.string().trim().optional(),
    image: FileSchema,
    isPublished: z.boolean().default(false),
    keywords: z.array(z.string()).nonempty('Las palabras clave son obligatorias'),
    createdAt: DateSchema,
    updatedAt: DateSchema.optional(),
})

const ListBannerArraySchema = z.array(BannerSchema)

const AddBannerSchema = z.object({
    pretitle: z.string().trim().optional(),
    title: z.string().min(1, 'El título es obligatorio').trim(),
    description: z.string().trim().optional(),
    image: z.instanceof(File, 'La imagen es obligatoria'),
    isPublished: z.boolean().default(false),
    createdAt: DateSchema,
    updatedAt: DateSchema,
})

const UpdateBannerSchema = z.object({
    id: z.string().min(1, 'El id es obligatorio').trim(),
    pretitle: z.string().trim().optional(),
    title: z.string().min(1, 'El título es obligatorio').trim(),
    description: z.string().trim().optional(),
    image: z.union([z.instanceof(File), z.undefined()]),
    imagePath: z.string().min(1, 'La ruta es obligatoria').trim(),
    keywords: z.array(z.string()).nonempty('Las palabras clave son obligatorias'),
    isPublished: z.boolean(),
    updatedAt: DateSchema,
}).transform((data) => {
    if (data.image === undefined) {
        const { image, ...rest } = data
        return rest
    }
    return data
})

const DeleteBannerSchema = z.object({
    id: z.string().min(1, 'El id es obligatorio').trim(),
    imagePath: z.string().min(1, 'La ruta es obligatoria').trim(),
})

export {
    BannerSchema,
    ListBannerArraySchema,
    AddBannerSchema,
    UpdateBannerSchema,
    DeleteBannerSchema,
}
