import * as DatabaseService from '@/shared/services/DatabaseService'
import * as StorageService from '@/shared/services/StorageService'


const storagePath = ({
    id = null,
    name,
}) => {
    return `/uploads/orders${id ? `/${id}` : ''}/${Date.now()}-${name}`
}

const list = ({
    source,
    filters,
    sorters,
    pageSize,
}) => {
    return DatabaseService.list({
        source,
        collectionName: 'orders',
        filters,
        sorters,
        pageSize,
    })
}

const get = ({
    source,
    id,
}) => {
    return DatabaseService.get({
        source,
        collectionName: 'orders',
        id,
    })
}

const add = async ({
    source,
    data,
}) => {
    const addResult = await DatabaseService.onTransaction({
        source,
        transaction: async (tx) => {
            try{
                const counterTx = await DatabaseService.getWithTransaction({
                    source,
                    tx,
                    collectionName: 'counters',
                    id: 'orders',
                })

                const count = counterTx?.data 
                    ? counterTx.data.count + 1 
                    : 1

                const orderTx = await DatabaseService.getWithTransaction({
                    source,
                    tx,
                    collectionName: 'orders',
                })

                const order = {
                    ...data,
                    count,
                }

                Boolean(counterTx?.data)
                    ? await DatabaseService.updateWithTransaction({
                        source,
                        tx,
                        ref: counterTx.ref,
                        data: { count },
                    })
                    : await DatabaseService.addWithTransaction({
                        source,
                        tx,
                        ref: counterTx.ref,
                        data: { count },
                    })

                await DatabaseService.addWithTransaction({
                    source,
                    tx,
                    ref: orderTx.ref,
                    data: order,
                })
                
                return { 
                    id: orderTx.ref.id,
                    ...order, 
                }
            }catch(err){
                return Promise.reject(err)
            }
        }
    })

    return addResult
}

const update = async({
    source,
    data,
}) => {
    if (Boolean(data.image)) {
        const imageStorageResult = await StorageService.update({
            source,
            file: data.image,
            newFilePath: storagePath({ id: data.id, name: data.image.name }),
            currentFilePath: data.imagePath,
        })
    
        if (imageStorageResult?.err) return imageStorageResult
        data.image = imageStorageResult.data
    }
    
    delete data.imagePath

    return DatabaseService.update({
        source,
        collectionName: 'orders',
        data,
    })
}

const remove = async ({
    source,
    id,
    imagePath,
}) => {
    const imageStorageResult = await StorageService.remove({
        source,
        filePath: imagePath,
    })

    if (imageStorageResult?.err) return imageStorageResult

    return DatabaseService.remove({
        source,
        collectionName: 'orders',
        id,
    })
}

const ORDER_TYPES = {
    ONLINE: 'online',
    ON_SITE: 'on-site',
}

const ORDER_TYPE_LABELS = {
    [ORDER_TYPES.ONLINE]: 'Online',
    [ORDER_TYPES.ON_SITE]: 'En local',
}

const ORDER_STATUSES = {
    PENDING: 'pending',
    ATTENDED: 'attended',
    COMPLETED: 'completed',
    CANCELLED: 'cancelled',
}

const ORDER_STATUS_LABELS = {
    [ORDER_STATUSES.PENDING]: 'Pendiente',
    [ORDER_STATUSES.ATTENDED]: 'Atendido',
    [ORDER_STATUSES.COMPLETED]: 'Completado',
    [ORDER_STATUSES.CANCELLED]: 'Cancelado',
}


export {
    list,
    get,
    add,
    update,
    remove,

    ORDER_TYPES,
    ORDER_TYPE_LABELS,
    ORDER_STATUSES,
    ORDER_STATUS_LABELS,
}