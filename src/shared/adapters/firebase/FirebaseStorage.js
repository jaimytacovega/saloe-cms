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
    filePath,
}) => {
    try {
        const storageRef = ref(storage, filePath)
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
    currentFilePath, //path
    newFilePath, //imagePath
}) => {
    console.log('currentFilePath =', currentFilePath)
    console.log('newFilePath =', newFilePath)
    try{
        await remove({ filePath: currentFilePath })
        return add({ file, filePath: newFilePath })
    }catch (err) {
        return { err }
    }
}

const remove = async ({
    filePath,
}) => {
    try{
        const storageRef = ref(storage, filePath)
        await deleteObject(storageRef)

        return {
            data: {
                filePath,
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