import * as StorageAdapter from '@/shared/adapters/firebase/FirebaseStorage'
import { FIREBASE_CREDENTIALS, Source } from '@/shared/utils/constants'



const add = ({
    source,
    file,
    path,
}) => {
    if (source === Source.FIREBASE) {
        StorageAdapter.init({ credentials: FIREBASE_CREDENTIALS })
        return StorageAdapter.add({
            file,
            path,
        })
    }
}

const update = ({
    source,
    file,
    path,
    imagePath,
}) => {
    if (source === Source.FIREBASE) {
        StorageAdapter.init({ credentials: FIREBASE_CREDENTIALS })
        return StorageAdapter.update({
            file,
            path,
            imagePath,
        })
    }
}

const remove = ({
    source,
    path,
}) => {
    if (source === Source.FIREBASE) {
        StorageAdapter.init({ credentials: FIREBASE_CREDENTIALS })
        return StorageAdapter.remove({
            path,
        })
    }
}

const addMultiple = async ({
    source,
    files,
    paths,
}) => {
    try{
        const addResults = await Promise.allSettled(
            files.map((file, index) => {
                return add({
                    source,
                    file,
                    path: paths[index],
                })
            })
        )
    
        const addResultsErr = addResults.find((result) => result.status === 'rejected')
        if (addResultsErr) throw addResultsErr.reason
    
        return {
            data: addResults.map((result) => result.value.data)
        }
    } catch (err) {
        return { err }
    }
}

const removeMultiple = async ({
    source,
    paths,
}) => {
    try{
        const removeResults = await Promise.allSettled(
            paths.map((path) => {
                return remove({ source, path })
            })
        )
            
        const removeResultsErr = removeResults.find((result) => result.status === 'rejected')
        if (removeResultsErr) throw removeResultsErr.reason
    
        return {
            data: removeResults.map((result) => result.value.data)
        }
    } catch (err) {
        return { err }
    }
}

export {
    add,
    update,
    remove,

    addMultiple,
    removeMultiple,
}