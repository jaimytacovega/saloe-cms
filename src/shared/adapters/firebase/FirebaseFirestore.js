import {
    getFirestore,
    collection,
    where,
    query,
    limit,
    doc,
    Timestamp,
    getDocs,
    getDoc,
    addDoc,
    updateDoc,
    runTransaction,
    increment,
    orderBy,
} from 'firebase/firestore/lite'

import { getApp } from '@/shared/adapters/firebase/FirebaseApp'


let firestore

const init = ({
    credentials,
    appName
}) => {
    const app = getApp({ credentials, appName })
    if (!firestore) firestore = getFirestore(app)
}

const buildQuery = ({
    collectionName,
    filters,
    sorters,
    pageSize,
}) => {
    const coll = collection(firestore, collectionName)
    const whr = filters?.map((filter) => where(filter.field, filter.operator, filter.value)) ?? []
    const lim = pageSize ? [limit(pageSize)] : []
    const ord = sorters?.map((sorter) => orderBy(sorter.field, sorter.direction)) ?? []

    return query(coll, ...whr, ...ord, ...lim)
}

const list = async ({
    collectionName,
    filters,
    sorters,
    pageSize,
}) => {
    try{
        const q = buildQuery({
            collectionName,
            filters,
            sorters,
            pageSize,
        })

        const snapshot = await getDocs(q)

        return {
            data: snapshot.docs
                .map((doc) => {
                    const data = formatDoc({ data: doc?.data() })
                    data.id = doc?.id
                    return data
                })
        }
    }catch(err){
        console.error(err)
        return { err }
    }
}

const formatDoc = ({ data }) => {
    for (const key of Object.keys(data))
        if (isTimestamp({ timestamp: data[key] }))
            data[key] = timestampToDate({ timestamp: data[key] })
    return data
}

const isTimestamp = ({ timestamp }) => typeof timestamp?.seconds !== 'undefined' && typeof timestamp?.nanoseconds !== 'undefined'

const timestampToDate = ({ timestamp }) => (new Timestamp(timestamp.seconds, timestamp.nanoseconds)).toDate()


export {
    init,

    list,
}