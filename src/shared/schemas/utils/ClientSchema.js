import { z } from 'zod'
import { CLIENT_TYPES } from '@/shared/repositories/QuotationRepository'


const ClientTypeSchema = z.enum(Object.values(CLIENT_TYPES), 'El tipo de cliente debe ser uno de los valores permitidos')

const ClientSchema = z.object({
    name: z.string().min(1, 'El nombre es obligatorio').trim(),
    code: z.string().regex(/^\d{11}$/, 'El código debe ser un RUC peruano válido').trim(),
    email: z.email('El correo electrónico debe tener un formato válido').trim(),
    phone: z.string().regex(/^(\+?51)?9\d{8}$/, 'El celular debe estar en un formato válido').trim(),
    type: ClientTypeSchema,
})

export {
    ClientSchema,
    ClientTypeSchema,
}