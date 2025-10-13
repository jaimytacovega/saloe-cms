import * as DatabaseService from '@/shared/services/DatabaseService'
import * as StorageService from '@/shared/services/StorageService'

import { keywords, getCMSCorrelative } from '@/shared/utils/utils'


const storagePath = ({
    id = null,
    name,
}) => {
    return `/uploads/quotations${id ? `/${id}` : ''}/${Date.now()}-${name}`
}

const list = ({
    source,
    filters,
    sorters,
    pageSize,
}) => {
    return DatabaseService.list({
        source,
        collectionName: 'quotations',
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
        collectionName: 'quotations',
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
                    id: 'quotations',
                })

                const count = counterTx?.data 
                    ? counterTx.data.count + 1 
                    : 1

                const quotationTx = await DatabaseService.getWithTransaction({
                    source,
                    tx,
                    collectionName: 'quotations',
                })

                const correlative = getCMSCorrelative({ collectionName: 'quotations', count })

                const quotation = {
                    ...data,
                    count,
                    keywords: keywords({ 
                        keys: [
                            correlative,
                            data.client.name,
                            data.client.code,
                            data.client.email,
                            data.client.phone,
                            data.deliveryLocation,
                        ] 
                    }),
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
                    ref: quotationTx.ref,
                    data: quotation,
                })
                
                return { 
                    id: quotationTx.ref.id,
                    ...quotation, 
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

                const quotationTx = await DatabaseService.getWithTransaction({
                    source,
                    tx,
                    collectionName: 'quotations',
                    id: data.id,
                })

                await DatabaseService.updateWithTransaction({
                    source,
                    tx,
                    ref: quotationTx.ref,
                    data,
                })

                return {
                    id: quotationTx.ref.id,
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

                const quotationTx = await DatabaseService.getWithTransaction({
                    source,
                    tx,
                    collectionName: 'quotations',
                    id,
                })

                await tx.delete(quotationTx.ref)

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

const QUOTATION_TYPES = {
    ONLINE: 'online',
    ON_SITE: 'on-site',
}

const QUOTATION_TYPE_LABELS = {
    [QUOTATION_TYPES.ONLINE]: 'Online',
    [QUOTATION_TYPES.ON_SITE]: 'En local',
}

const QUOTATION_STATUSES = {
    PENDING: 'pending',
    QUOTED: 'quoted',
    SOLD: 'sold',
    NOT_SOLD: 'not-sold',
}

const QUOTATION_STATUS_LABELS = {
    [QUOTATION_STATUSES.PENDING]: 'Pendiente',
    [QUOTATION_STATUSES.QUOTED]: 'Cotizado',
    [QUOTATION_STATUSES.SOLD]: 'Vendido',
    [QUOTATION_STATUSES.NOT_SOLD]: 'No vendido',
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

    QUOTATION_TYPES,
    QUOTATION_TYPE_LABELS,
    QUOTATION_STATUSES,
    QUOTATION_STATUS_LABELS,

    CLIENT_TYPES,
    CLIENT_TYPE_LABELS,
}