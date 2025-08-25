import { z } from 'zod'


const DateSchema = z.union([z.string(), z.date()]).transform((val) => {
    return (typeof val === 'string') 
        ? new Date(val) 
        : val
})

export {
    DateSchema,
}