import * as FirebaseApp from 'firebase/app'


export const getApp = ({ 
    credentials, 
    appName, 
}) => {
    return !FirebaseApp.getApps().length 
        ? FirebaseApp.initializeApp(credentials) 
        : FirebaseApp.getApp(appName)
}