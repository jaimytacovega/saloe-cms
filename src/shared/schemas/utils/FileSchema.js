import { z } from 'zod'


const FileSchema = z.object({
    downloadURL: z.string().min(1, 'La URL de descarga es obligatoria').trim().optional(),
    path: z.string().min(1, 'La ruta es obligatoria').trim().optional(),
}).partial()


export { 
    FileSchema,
}