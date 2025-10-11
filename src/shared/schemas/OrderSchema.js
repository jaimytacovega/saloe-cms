import { z } from 'zod'
import { FileSchema } from '@/shared/schemas/utils/FileSchema'
import { DateSchema } from '@/shared/schemas/utils/DateSchema'
import { ClientSchema } from '@/shared/schemas/utils/ClientSchema'
import { ORDER_TYPES, ORDER_STATUSES, CLIENT_TYPES } from '@/shared/repositories/OrderRepository'


const OrderSchema = z.object({
    id: z.string().min(1, 'El id es obligatorio').trim(),
    count: z.number(),
    client: ClientSchema,
    attachments: z.array(FileSchema).optional(),
    request: z.string().trim().optional(),
    promotionIds: z.array(z.string()).optional(),
    type: z.enum(Object.values(ORDER_TYPES), 'El tipo de cotización debe ser uno de los valores permitidos'),
    status: z.enum(Object.values(ORDER_STATUSES), 'El estado debe ser uno de los valores permitidos'),
    keywords: z.array(z.string()).nonempty('Las palabras clave son obligatorias'),
    createdAt: DateSchema,
    updatedAt: DateSchema.optional(),
})

const ListOrderArraySchema = z.array(OrderSchema)

const AddOrderSchema = z.object({
    client: ClientSchema,
    attachments: z.array(z.instanceof(File)).optional(),
    request: z.string().trim().optional(),
    promotionIds: z.array(z.string()).optional(),
    type: z.enum(Object.values(ORDER_TYPES), 'El tipo de cotización debe ser uno de los valores permitidos'),
    status: z.enum(Object.values(ORDER_STATUSES), 'El estado debe ser uno de los valores permitidos'),
    keywords: z.array(z.string()).nonempty('Las palabras clave son obligatorias'),
    createdAt: DateSchema,
    updatedAt: DateSchema,
})

const UpdateOrderSchema = z.object({
    id: z.string().min(1, 'El id es obligatorio').trim(),
    client: ClientSchema,
    attachments: z.array(z.instanceof(File)).optional(),
    request: z.string().trim().optional(),
    attachmentsToKeep: z.array(FileSchema).optional(),
    attachmentsToRemove: z.array(z.string()).optional(),
    promotionIds: z.array(z.string()).optional(),
    type: z.enum(Object.values(ORDER_TYPES), 'El tipo de cotización debe ser uno de los valores permitidos'),
    status: z.enum(Object.values(ORDER_STATUSES), 'El estado debe ser uno de los valores permitidos'),
    keywords: z.array(z.string()).nonempty('Las palabras clave son obligatorias'),
    updatedAt: DateSchema,
})

const DeleteOrderSchema = z.object({
    id: z.string().min(1, 'El id es obligatorio').trim(),
    attachmentPaths: z.array(z.string().trim()).optional(),
})

export {
    OrderSchema,
    ListOrderArraySchema,
    AddOrderSchema,
    UpdateOrderSchema,
    DeleteOrderSchema,
}
