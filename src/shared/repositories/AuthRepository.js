import * as AuthService from '@/shared/services/AuthService'


const signInWithEmailAndPassword = ({
    source,
    email,
    password,
}) => {
    return AuthService.signInWithEmailAndPassword({
        source,
        email,
        password,
    })
}

const signOut = ({
    source,
}) => {
    return AuthService.signOut({
        source,
    })
}

const getCurrentUser = ({
    source,
}) => {
    return AuthService.getCurrentUser({
        source,
    })
}

export {
    signInWithEmailAndPassword,
    signOut,
    getCurrentUser,
}