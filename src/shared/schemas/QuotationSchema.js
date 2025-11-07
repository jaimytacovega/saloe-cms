import { z } from 'zod'
import { FileSchema } from '@/shared/schemas/utils/FileSchema'
import { DateSchema } from '@/shared/schemas/utils/DateSchema'
import { ClientSchema, ClientTypeSchema } from '@/shared/schemas/utils/ClientSchema'
import { QUOTATION_TYPES, QUOTATION_STATUSES } from '@/shared/repositories/QuotationRepository'


const QuotationSchema = z.object({
    id: z.string().min(1, 'El id es obligatorio').trim(),
    count: z.number(),
    client: ClientSchema,
    clientType: ClientTypeSchema,
    attachments: z.array(FileSchema).optional(),
    request: z.string().trim().optional(),
    deliveryLocation: z.string().trim().optional(),
    promotionIds: z.array(z.string()).optional(),
    type: z.enum(Object.values(QUOTATION_TYPES), 'El tipo de cotización debe ser uno de los valores permitidos'),
    status: z.enum(Object.values(QUOTATION_STATUSES), 'El estado debe ser uno de los valores permitidos'),
    keywords: z.array(z.string()).nonempty('Las palabras clave son obligatorias'),
    createdAt: DateSchema,
    updatedAt: DateSchema.optional(),
})

const ListQuotationArraySchema = z.array(QuotationSchema)

const AddQuotationSchema = z.object({
    client: ClientSchema,
    clientType: ClientTypeSchema,
    attachments: z.array(z.instanceof(File)).optional(),
    request: z.string().trim().optional(),
    deliveryLocation: z.string().trim().optional(),
    promotionIds: z.array(z.string()).optional(),
    type: z.enum(Object.values(QUOTATION_TYPES), 'El tipo de cotización debe ser uno de los valores permitidos'),
    status: z.enum(Object.values(QUOTATION_STATUSES), 'El estado debe ser uno de los valores permitidos'),
    createdAt: DateSchema,
    updatedAt: DateSchema,
})

const UpdateQuotationSchema = z.object({
    id: z.string().min(1, 'El id es obligatorio').trim(),
    client: ClientSchema,
    clientType: ClientTypeSchema,
    attachments: z.array(z.instanceof(File)).optional(),
    request: z.string().trim().optional(),
    deliveryLocation: z.string().trim().optional(),
    attachmentsToKeep: z.array(FileSchema).optional(),
    attachmentsToRemove: z.array(z.string()).optional(),
    promotionIds: z.array(z.string()).optional(),
    type: z.enum(Object.values(QUOTATION_TYPES), 'El tipo de cotización debe ser uno de los valores permitidos'),
    status: z.enum(Object.values(QUOTATION_STATUSES), 'El estado debe ser uno de los valores permitidos'),
    keywords: z.array(z.string()).nonempty('Las palabras clave son obligatorias'),
    updatedAt: DateSchema,
})

const DeleteQuotationSchema = z.object({
    id: z.string().min(1, 'El id es obligatorio').trim(),
    attachmentPaths: z.array(z.string().trim()).optional(),
})

export {
    QuotationSchema,
    ListQuotationArraySchema,
    AddQuotationSchema,
    UpdateQuotationSchema,
    DeleteQuotationSchema,
}
