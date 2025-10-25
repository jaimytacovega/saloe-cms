import { z } from 'zod'


const SignInWithEmailAndPasswordSchema = z.object({
    email: z.email('El correo electrónico debe tener un formato válido').trim(),
    password: z.string().min(1, 'La contraseña es obligatoria').trim(),
})

export {
    SignInWithEmailAndPasswordSchema,
}