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
    oldPath,
}) => {
    if (source === Source.FIREBASE) {
        StorageAdapter.init({ credentials: FIREBASE_CREDENTIALS })
        return StorageAdapter.update({
            file,
            path,
            oldPath,
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

export {
    add,
    update,
    remove,
}