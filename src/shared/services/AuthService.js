import * as FirebaseAuthAdapter from '@/shared/adapters/firebase/FirebaseAuth'
import * as CookieService from '@/shared/services/CookieService'
import { FIREBASE_CREDENTIALS, Source } from '@/shared/utils/constants'


const signInWithEmailAndPassword = ({
    source,
    email,
    password,
}) => {
    if (source === Source.FIREBASE) {
        FirebaseAuthAdapter.init({ credentials: FIREBASE_CREDENTIALS })
        return FirebaseAuthAdapter.signInWithEmailAndPassword({
            email, 
            password,
        })
    }
}

const signOut = ({
    source,
}) => {
    if (source === Source.FIREBASE) {
        FirebaseAuthAdapter.init({ credentials: FIREBASE_CREDENTIALS })
        return FirebaseAuthAdapter.signOut()
    }
}

const getCredentialsFromCookies = ({
    cookies,
}) => {
    const authorizationCookie = CookieService.get({
        key: 'Authorization',
        cookies,
    }) ?? '{}'

    return JSON.parse(authorizationCookie)
}

const setCredentialsInCookies = ({
    credentials,
}) => {
    return CookieService.set({
        key: 'Authorization',
        value: JSON.stringify({
            authId: credentials.user.uid,
            email: credentials.user.email,
            displayName: credentials.user.displayName,
            photoURL: credentials.user.photoURL,
        }),
    })
}

const removeCredentialsFromCookies = () => {
    return CookieService.remove({
        key: 'Authorization',
    })
}

const checkAndRedirectToCms = ({
    request,
    cookies,
}) => {
    const { authId } = getCredentialsFromCookies({ cookies })
    if (authId) {
        return {
            response: new Response(null, {
                status: 302,
                headers: {
                    Location: new URL('/cms/marcas', request.url).toString(),
                    'Cache-Control': 'no-store',
                },
            }),
        }
    }
    return { response: null }
}

export {
    signInWithEmailAndPassword,
    signOut,

    getCredentialsFromCookies,
    setCredentialsInCookies,
    removeCredentialsFromCookies,

    checkAndRedirectToCms,
}