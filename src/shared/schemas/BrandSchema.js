import { z } from 'zod'
import { FileSchema } from '@/shared/schemas/utils/FileSchema'
import { DateSchema } from '@/shared/schemas/utils/DateSchema'


const BrandSchema = z.object({
    id: z.string().min(1, 'El id es obligatorio').trim(),
    count: z.number(),
    name: z.string().min(1, 'El nombre es obligatorio').trim(),
    image: FileSchema,
    keywords: z.array(z.string()).nonempty('Las palabras clave son obligatorias'),
    createdAt: DateSchema,
    updatedAt: DateSchema.optional(),
})

const ListBrandArraySchema = z.array(BrandSchema)

const AddBrandSchema = z.object({
    name: z.string().min(1, 'El nombre es obligatorio').trim(),
    image: z.instanceof(File, 'La imagen es obligatoria'),
    keywords: z.array(z.string()).nonempty('Las palabras clave son obligatorias'),
    createdAt: DateSchema,
    updatedAt: DateSchema,
})  

const UpdateBrandSchema = z.object({
    id: z.string().min(1, 'El id es obligatorio').trim(),
    name: z.string().min(1, 'El nombre es obligatorio').trim(),
    image: z.union([z.instanceof(File), z.undefined()]),
    oldPath: z.string().min(1, 'La ruta es obligatoria').trim(),
    keywords: z.array(z.string()).nonempty('Las palabras clave son obligatorias'),
    updatedAt: DateSchema,
}).transform((data) => {
    if (data.image === undefined) {
        const { image, ...rest } = data
        return rest
    }
    return data
})

const DeleteBrandSchema = z.object({
    id: z.string().min(1, 'El id es obligatorio').trim(),
    path: z.string().min(1, 'La ruta es obligatoria').trim(),
})

export {
    BrandSchema,
    ListBrandArraySchema,
    AddBrandSchema,
    UpdateBrandSchema,
    DeleteBrandSchema,
}
