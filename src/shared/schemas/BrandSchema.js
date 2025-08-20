import { z } from 'zod';


const AddBrandSchema = z.object({
    name: z.string().min(1, 'El nombre es obligatorio').trim(),
    image: z.instanceof(File, 'La imagen es obligatoria'),
    keywords: z.array(z.string()).nonempty('Las palabras clave son obligatorias'),
    createdAt: z.date(),
})

const UpdateBrandSchema = z.object({
    name: z.string().min(1, 'El nombre es obligatorio').trim(),
    image: z.instanceof(File, 'La imagen es obligatoria'),
    oldPath: z.string().min(1, 'La ruta es obligatoria').trim(),
    keywords: z.array(z.string()).nonempty('Las palabras clave son obligatorias'),
    updatedAt: z.date(),
})

export {
    AddBrandSchema,
    UpdateBrandSchema,
}
