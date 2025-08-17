import * as FirestoreAdapter from '@/shared/adapters/firebase/FirebaseFirestore'
import { FIREBASE_CREDENTIALS, Source } from '@/shared/utils/constants'


const list = async ({
    source,
    collectionName,
    filters,
    sorters,
    pageSize,
}) => {
    if (source === Source.FIREBASE) {
        FirestoreAdapter.init({ credentials: FIREBASE_CREDENTIALS })
        return FirestoreAdapter.list({
            collectionName,
            filters,
            sorters,
            pageSize,
        })
    }
}

export {
    list,
}