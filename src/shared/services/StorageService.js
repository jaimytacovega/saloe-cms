import * as StorageAdapter from '@/shared/adapters/firebase/FirebaseStorage'
import { FIREBASE_CREDENTIALS, Source } from '@/shared/utils/constants'



const add = ({
    source,
    file,
    filePath,
}) => {
    if (source === Source.FIREBASE) {
        StorageAdapter.init({ credentials: FIREBASE_CREDENTIALS })
        return StorageAdapter.add({
            file,
            filePath,
        })
    }
}

const update = ({
    source,
    file,
    currentFilePath,
    newFilePath,
}) => {
    if (source === Source.FIREBASE) {
        StorageAdapter.init({ credentials: FIREBASE_CREDENTIALS })
        return StorageAdapter.update({
            file,
            currentFilePath,
            newFilePath,
        })
    }
}

const remove = ({
    source,
    filePath,
}) => {
    if (source === Source.FIREBASE) {
        StorageAdapter.init({ credentials: FIREBASE_CREDENTIALS })
        return StorageAdapter.remove({
            filePath,
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
    filePaths,
}) => {
    try{
        const removeResults = await Promise.allSettled(
            filePaths.map((filePath) => {
                return remove({ source, filePath })
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