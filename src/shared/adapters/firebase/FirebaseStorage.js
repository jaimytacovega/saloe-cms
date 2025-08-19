import { 
    getStorage, 
    ref, 
    uploadBytes, 
    getDownloadURL, 
    deleteObject, 
} from 'firebase/storage'

import { getApp } from '@/shared/adapters/firebase/FirebaseApp'


let storage

const init = ({
    credentials,
    appName
}) => {
    const app = getApp({ credentials, appName })
    if (!storage) storage = getStorage(app)
}

const add = async ({
    file,
    path,
}) => {
    try {
        const storageRef = ref(storage, path)
        await uploadBytes(storageRef, file)
        const downloadURL = await getDownloadURL(storageRef)

        return {
            data: {
                downloadURL,
                path: storageRef.fullPath,
            }
        }
    }catch (err) {
        return { err }
    }
}

const update = async ({
    file,
    path,
    oldPath,
}) => {
    try{
        await remove({ path: oldPath })
        return add({ file, path })
    }catch (err) {
        return { err }
    }
}

const remove = async ({
    path,
}) => {
    try{
        const storageRef = ref(storage, path)
        await deleteObject(storageRef)

        return {
            data: {
                path,
            }
        }
    }catch (err) {
        return { err }
    }
}   

export {
    init,
    add,
    update,
    remove,
}