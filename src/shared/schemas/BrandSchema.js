import { z } from 'zod'
import { FileSchema } from '@/shared/schemas/utils/FileSchema'


const AddBrandSchema = z.object({
    name: z.string().min(1, 'El nombre es obligatorio').trim(),
    image: z.instanceof(File, 'La imagen es obligatoria'),
    keywords: z.array(z.string()).nonempty('Las palabras clave son obligatorias'),
    createdAt: z.date(),
})

const UpdateBrandSchema = z.object({
    id: z.string().min(1, 'El id es obligatorio').trim(),
    name: z.string().min(1, 'El nombre es obligatorio').trim(),
    image: z.instanceof(File, 'La imagen es obligatoria'),
    oldPath: z.string().min(1, 'La ruta es obligatoria').trim(),
    keywords: z.array(z.string()).nonempty('Las palabras clave son obligatorias'),
    updatedAt: z.date(),
})

const DeleteBrandSchema = z.object({
    id: z.string().min(1, 'El id es obligatorio').trim(),
    path: z.string().min(1, 'La ruta es obligatoria').trim(),
})

const ListBrandSchema = z.object({
    id: z.string().min(1, 'El id es obligatorio').trim(),
    name: z.string().min(1, 'El nombre es obligatorio').trim(),
    image: FileSchema,
    keywords: z.array(z.string()).nonempty('Las palabras clave son obligatorias'),
    createdAt: z.date(),
    updatedAt: z.date().optional(),
})

const ListBrandArraySchema = z.array(ListBrandSchema)

export {
    AddBrandSchema,
    UpdateBrandSchema,
    DeleteBrandSchema,
    ListBrandSchema,
    ListBrandArraySchema,
}
