import * as FirebaseAuthAdapter from '@/shared/adapters/firebase/FirebaseAuth'
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

const getCurrentUser = ({
    source,
}) => {
    if (source === Source.FIREBASE) {
        FirebaseAuthAdapter.init({ credentials: FIREBASE_CREDENTIALS })
        return FirebaseAuthAdapter.getCurrentUser()
    }
}

export {
    signInWithEmailAndPassword,
    signOut,
    getCurrentUser,
}