import * as FirebaseAuth from 'firebase/auth'

import { getApp } from '@/shared/adapters/firebase/FirebaseApp'


let auth

const init = ({
    credentials,
    appName,
}) => {
    const app = getApp({ credentials, appName })
    if (!auth) auth = FirebaseAuth.getAuth(app)
}

const signInWithEmailAndPassword = async ({
    email,
    password,
}) => {
    try{
        const userCredential = await FirebaseAuth.signInWithEmailAndPassword(auth, email, password)
        return {
            data: {
                user: userCredential.user,
            }
        }
    }catch(err){
        return { err }
    }
}

const signOut = async () => {
    try{
        await FirebaseAuth.signOut(auth)
        return {
            data: {
                user: null,
            }
        }
    }catch(err){
        return { err }
    }
}

const getCurrentUser = () => {
    return FirebaseAuth.getCurrentUser(auth)
}

export {
    init,
    signInWithEmailAndPassword,
    signOut,
    getCurrentUser,
}