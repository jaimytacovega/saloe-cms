import * as FirestoreAdapter from '@/shared/adapters/firebase/FirebaseFirestore'
import { FIREBASE_CREDENTIALS, Source } from '@/shared/utils/constants'


const Operators = {
    LessThan: '<',
    LessThanOrEqualTo: '<=',
    EqualTo: '==',
    GreaterThan: '>',
    GreaterThanOrEqualTo: '>=',
    NotEqualTo: '!=',
    In: 'in',
    Contains: 'array-contains',
}

const list = ({
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

const get = ({
    source,
    collectionName,
    id,
}) => {
    if (source === Source.FIREBASE) {
        FirestoreAdapter.init({ credentials: FIREBASE_CREDENTIALS })
        return FirestoreAdapter.get({
            collectionName,
            id,
        })
    }
}

const add = ({
    source,
    collectionName,
    data,
}) => {
    if (source === Source.FIREBASE) {
        FirestoreAdapter.init({ credentials: FIREBASE_CREDENTIALS })
        return FirestoreAdapter.add({
            collectionName,
            docData: data,
        })
    }
}

const update = ({
    source,
    collectionName,
    data,
}) => {
    if (source === Source.FIREBASE) {
        FirestoreAdapter.init({ credentials: FIREBASE_CREDENTIALS })
        return FirestoreAdapter.update({
            collectionName,
            docData: data,
        })
    }
}

const remove = ({
    source,
    collectionName,
    id,
}) => {
    if (source === Source.FIREBASE) {
        FirestoreAdapter.init({ credentials: FIREBASE_CREDENTIALS })
        return FirestoreAdapter.remove({
            collectionName,
            id,
        })
    }
}

export {
    Operators,

    list,   
    get,
    add,
    update,
    remove,
}