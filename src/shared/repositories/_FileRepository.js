import * as StorageService from '@/shared/services/StorageService'


const add = ({
    source,
    file,
    path,
}) => {
    return StorageService.add({
        source,
        file,
        path,
    })
}

const update = ({
    source,
    file,
    path,
    oldPath,
}) => {
    return StorageService.update({
        source,
        file,
        path,
        oldPath,
    })
}

const remove = ({
    source,
    path,
}) => {
    return StorageService.remove({
        source,
        path,
    })
}

const addMultiple = async ({
    source,
    files,
    paths,
}) => {
    try{
        const addResults = await Promise.allSettled(
            files.map((file, index) => {
                return StorageService.add({
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