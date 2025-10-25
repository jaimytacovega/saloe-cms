import * as AuthRepository from '@/shared/repositories/AuthRepository'
import { SignInWithEmailAndPasswordSchema } from '@/shared/schemas/AuthSchema'
import { prettifyError } from '@/shared/schemas/utils/utils'


const signInWithEmailAndPassword = async ({
    source,
    email,
    password,
}) => {
    try{
        const schemaResult = SignInWithEmailAndPasswordSchema.safeParse({
            email,
            password,
        })
        if (!schemaResult.success) throw prettifyError({ error: schemaResult.error })
    
        const signInWithEmailAndPasswordResult = await AuthRepository.signInWithEmailAndPassword({
            source,
            email: schemaResult.data.email,
            password: schemaResult.data.password,
        })

        if (signInWithEmailAndPasswordResult?.err) throw signInWithEmailAndPasswordResult.err

        return { data: signInWithEmailAndPasswordResult.data }
    } catch (err) {
        console.error(err)
        return { err }
    }
}

const signOut = () => {
    return AuthRepository.signOut()
}

const getCurrentUser = () => {
    return AuthRepository.getCurrentUser()
}

export {
    signInWithEmailAndPassword,
    signOut,
    getCurrentUser,
}