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
    deleteDoc,
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

const get = async ({
    collectionName,
    id,
}) => {
    try {
        const docRef = await getDoc(doc(firestore, collectionName, id))
        const data = {
            id: docRef.id,
            ...formatDoc({ data: docRef.data() })
        }
        return { data }
    } catch (err) {
        return { err }
    }
}

const add = async ({ collectionName, docData }) => {
    const { id, ...data } = docData
    try {
        const docRef = await addDoc(collection(firestore, collectionName), formatDocForDB({ doc: data }))
        return {
            data: {
                id: docRef.id,
                ...data,
            }
        }
    } catch (err) {
        return { err }
    }
}

const update = async ({ collectionName, docData }) => {
    const { id, ...data } = docData
    const docRef = doc(firestore, collectionName, id)
    try {
        await updateDoc(docRef, formatDocForDB({ doc: data }))
        return {
            data: {
                id: docRef.id,
                ...data
            }
        }
    } catch (err) {
        return { err }
    }
}

const remove = async ({ collectionName, id }) => {
    const docRef = doc(firestore, collectionName, id)
    try {
        await deleteDoc(docRef)
        return {
            data: {
                id,
            }
        }
    }
    catch (err) {
        return { err }
    }
}

const getDocRef = ({ collectionName, id }) => {
    return id 
        ? doc(firestore, collectionName, id) 
        : doc(collection(firestore, collectionName))
}

const incrementCounter = async ({
    collectionName,
    id,
    value,
}) => {
    const docRef = getDocRef({ collectionName, id })
    const updateResult = await updateDoc(docRef, {
        count: increment(value),
    })
    if (updateResult?.err) return updateResult

    return get({ collectionName, id })
}

const onTransaction = async ({ transaction }) => {
    try{
        const transactionResult = await runTransaction(firestore, transaction)
        return { data: transactionResult }
    }catch(err){
        return { err }
    }
}

const getWithTransaction = async ({
    tx,
    collectionName,
    id,
}) => {
    const ref = getDocRef({ collectionName, id })
    const refDoc = await tx.get(ref)
    const data = refDoc.exists() 
        ? refDoc.data() 
        : null

    return {
        ref, 
        data,
    }
}

const addWithTransaction = ({
    tx,
    collectionName,
    ref,
    data,
}) => {
    return tx.set(ref ?? getDocRef({ collectionName, id: data?.id }), formatDocForDB({ doc: data }))
}

const updateWithTransaction = ({
    tx,
    collectionName,
    ref,
    data,
}) => {
    return tx.update(ref ?? getDocRef({ collectionName, id: data?.id }), formatDocForDB({ doc: data }))
}

const formatDoc = ({ data }) => {
    for (const key of Object.keys(data))
        if (isTimestamp({ timestamp: data[key] }))
            data[key] = timestampToDate({ timestamp: data[key] })
    return data
}

const formatDocForDB = ({ doc }) => {
    const { id, ...data } = doc
    for (const key of Object.keys(data))
        if (typeof data[key] instanceof Date)
            data[key] = dateToTimestamp({ date: data[key] })
    return data
}

const isTimestamp = ({ timestamp }) => typeof timestamp?.seconds !== 'undefined' && typeof timestamp?.nanoseconds !== 'undefined'

const timestampToDate = ({ timestamp }) => (new Timestamp(timestamp.seconds, timestamp.nanoseconds)).toDate()

const dateToTimestamp = ({ date }) => Timestamp.fromDate(date)


export {
    init,

    list,
    get,
    add,
    update,
    remove,

    incrementCounter,

    onTransaction,
    getWithTransaction,
    addWithTransaction,
    updateWithTransaction,
}