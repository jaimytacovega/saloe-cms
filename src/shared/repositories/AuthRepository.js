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

const setCredentialsInCookies = ({
    credentials,
}) => {
    return AuthService.setCredentialsInCookies({
        credentials,
    })
}

const removeCredentialsFromCookies = () => {
    return AuthService.removeCredentialsFromCookies()
}

export {
    signInWithEmailAndPassword,
    signOut,

    setCredentialsInCookies,
    removeCredentialsFromCookies,
}