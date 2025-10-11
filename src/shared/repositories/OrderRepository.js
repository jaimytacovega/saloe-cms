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
    const updateResult = await DatabaseService.onTransaction({
        source,
        transaction: async (tx) => {
            try{
                if (Boolean(data.attachmentsToRemove)) {
                    const attachmentsStorageResults = await StorageService.removeMultiple({
                        source,
                        filePaths: data.attachmentsToRemove,
                    })
            
                    if (attachmentsStorageResults?.err) throw attachmentsStorageResults.err
                }
            
                delete data.attachmentsToRemove

                const addAttachmentsStorageResults = await StorageService.addMultiple({
                    source,
                    files: data.attachments,
                    paths: data.attachments.map((attachment) => storagePath({ id: data.id, name: attachment.name })),
                })
                if (addAttachmentsStorageResults?.err) throw addAttachmentsStorageResults.err

                data.attachments = [
                    ...data.attachmentsToKeep,
                    ...addAttachmentsStorageResults.data,
                ]
            
                delete data.attachmentsToKeep

                const orderTx = await DatabaseService.getWithTransaction({
                    source,
                    tx,
                    collectionName: 'orders',
                    id: data.id,
                })

                await DatabaseService.updateWithTransaction({
                    source,
                    tx,
                    ref: orderTx.ref,
                    data,
                })

                return {
                    id: orderTx.ref.id,
                    ...data,
                }
            }catch(err){
                return Promise.reject(err)
            }
        }
    })

    return updateResult
}

const remove = async ({
    source,
    id,
    attachmentPaths,
}) => {
    const removeResult = await DatabaseService.onTransaction({
        source,
        transaction: async (tx) => {
            try{
                const removeFilesResults = await StorageService.removeMultiple({
                    source,
                    filePaths: [...attachmentPaths],
                })

                if (removeFilesResults?.err) throw removeFilesResults.err

                const orderTx = await DatabaseService.getWithTransaction({
                    source,
                    tx,
                    collectionName: 'orders',
                    id,
                })

                await tx.delete(orderTx.ref)

                return {
                    data: { id },
                }
            }catch(err){
                return Promise.reject(err)
            }
        },
    })

    return removeResult
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

const CLIENT_TYPES = {
    HARDWARE_STORE: 'hardware-store',
    CONSTRUCTION_COMPANY: 'construction-company',
    SELF_CONSTRUCTION: 'self-construction',
    PROJECT: 'project',
    OTHER: 'other',
}

const CLIENT_TYPE_LABELS = {
    [CLIENT_TYPES.HARDWARE_STORE]: 'Ferretero',
    [CLIENT_TYPES.CONSTRUCTION_COMPANY]: 'Constructora',
    [CLIENT_TYPES.SELF_CONSTRUCTION]: 'Construcción propia',
    [CLIENT_TYPES.PROJECT]: 'Obra',
    [CLIENT_TYPES.OTHER]: 'Otro',
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

    CLIENT_TYPES,
    CLIENT_TYPE_LABELS,
}