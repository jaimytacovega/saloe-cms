import { z } from 'zod'
import { FileSchema } from '@/shared/schemas/utils/FileSchema'
import { DateSchema } from '@/shared/schemas/utils/DateSchema'


const ProductSKUSchema = z.string().regex(/^[A-Z]{4}\d{6}$/, 'El SKU debe tener 4 letras mayúsculas y 6 dígitos numéricos').trim()

const ProductSchema = z.object({
    id: z.string().min(1, 'El id es obligatorio').trim(),
    count: z.number(),
    name: z.string().min(1, 'El nombre es obligatorio').trim(),
    sku: ProductSKUSchema,
    description: z.string().trim().optional(),
    image: FileSchema,
    subCategoryIds: z.array(z.string()).optional(),
    brandIds: z.array(z.string()).optional(),
    technicalSheet: FileSchema.optional(),
    keywords: z.array(z.string()).nonempty('Las palabras clave son obligatorias'),
    createdAt: DateSchema,
    updatedAt: DateSchema.optional(),
})

const ListProductArraySchema = z.array(ProductSchema)

const AddProductSchema = z.object({
    name: z.string().min(1, 'El nombre es obligatorio').trim(),
    sku: ProductSKUSchema,
    description: z.string().trim().optional(),
    image: z.instanceof(File, 'La imagen es obligatoria'),
    subCategoryIds: z.array(z.string()).optional(),
    brandIds: z.array(z.string()).optional(),
    technicalSheet: z.instanceof(File).optional(),
    createdAt: DateSchema,
    updatedAt: DateSchema,
})  

const UpdateProductSchema = z.object({
    id: z.string().min(1, 'El id es obligatorio').trim(),
    sku: ProductSKUSchema,
    name: z.string().min(1, 'El nombre es obligatorio').trim(),
    description: z.string().trim().optional(),
    image: z.union([z.instanceof(File), z.undefined()]),
    imagePath: z.string().min(1, 'La ruta es obligatoria').trim(),
    subCategoryIds: z.array(z.string()).optional(),
    brandIds: z.array(z.string()).optional(),
    technicalSheetPath: z.string().trim(),
    technicalSheet: z.instanceof(File).optional(),
    /** Set when the user removed the existing file via InputFile (see `#technicalSheet__filesToRemove`). */
    removeTechnicalSheet: z.boolean().optional(),
    keywords: z.array(z.string()).nonempty('Las palabras clave son obligatorias'),
    updatedAt: DateSchema,
}).transform((data) => {
    if (data.image === undefined) delete data.image
    if (data.technicalSheet === undefined) delete data.technicalSheet
    if (data.removeTechnicalSheet === undefined) delete data.removeTechnicalSheet
    return data
})

const DeleteProductSchema = z.object({
    id: z.string().min(1, 'El id es obligatorio').trim(),
    imagePath: z.string().min(1, 'La ruta es obligatoria').trim(),
    technicalSheetPath: z.string().trim(),
})

export {
    ProductSchema,
    ListProductArraySchema,
    AddProductSchema,
    UpdateProductSchema,
    DeleteProductSchema,
}
