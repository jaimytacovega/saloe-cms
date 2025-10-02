import { z } from 'zod'
import { FileSchema } from '@/shared/schemas/utils/FileSchema'
import { DateSchema } from '@/shared/schemas/utils/DateSchema'
import { ORDER_TYPES, ORDER_STATUSES } from '@/shared/repositories/OrderRepository'


const OrderSchema = z.object({
    id: z.string().min(1, 'El id es obligatorio').trim(),
    count: z.number(),
    name: z.string().min(1, 'El nombre es obligatorio').trim(),
    image: FileSchema,
    keywords: z.array(z.string()).nonempty('Las palabras clave son obligatorias'),
    createdAt: DateSchema,
    updatedAt: DateSchema.optional(),
})

const ListOrderArraySchema = z.array(OrderSchema)

const AddOrderSchema = z.object({
    client: z.object({
        name: z.string().min(1, 'El nombre es obligatorio').trim(),
        code: z.string().regex(/^\d{11}$/, 'El código debe ser un RUC peruano válido').trim(),
        email: z.email('El correo electrónico debe tener un formato válido').trim(),
        phone: z.string().regex(/^(\+?51)?9\d{8}$/, 'El celular debe estar en un formato válido').trim(),
    }),
    attachments: z.array(z.instanceof(File)).optional(),
    promotionIds: z.array(z.string()).optional(),
    type: z.enum(Object.values(ORDER_TYPES), 'El tipo debe ser uno de los valores permitidos'),
    status: z.enum(Object.values(ORDER_STATUSES), 'El estado debe ser uno de los valores permitidos'),
    keywords: z.array(z.string()).nonempty('Las palabras clave son obligatorias'),
    createdAt: DateSchema,
    updatedAt: DateSchema,
})

const UpdateOrderSchema = z.object({
    id: z.string().min(1, 'El id es obligatorio').trim(),
    name: z.string().min(1, 'El nombre es obligatorio').trim(),
    image: z.union([z.instanceof(File), z.undefined()]),
    imagePath: z.string().min(1, 'La ruta es obligatoria').trim(),
    keywords: z.array(z.string()).nonempty('Las palabras clave son obligatorias'),
    updatedAt: DateSchema,
}).transform((data) => {
    if (data.image === undefined) {
        const { image, ...rest } = data
        return rest
    }
    return data
})

const DeleteOrderSchema = z.object({
    id: z.string().min(1, 'El id es obligatorio').trim(),
    imagePath: z.string().min(1, 'La ruta es obligatoria').trim(),
})

export {
    OrderSchema,
    ListOrderArraySchema,
    AddOrderSchema,
    UpdateOrderSchema,
    DeleteOrderSchema,
}
