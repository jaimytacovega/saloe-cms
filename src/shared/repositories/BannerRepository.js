import * as DatabaseService from '@/shared/services/DatabaseService'
import * as StorageService from '@/shared/services/StorageService'

import { keywords, getCMSCorrelative } from '@/shared/utils/utils'


const storagePath = ({
    id = null,
    name,
}) => {
    return `/uploads/banners${id ? `/${id}` : ''}/${Date.now()}-${name}`
}

const PUBLISHED_BANNER_QUERY_LIMIT = 100

const publishedBannersFilter = [{
    field: 'isPublished',
    operator: DatabaseService.Operators.EqualTo,
    value: true,
}]

/**
 * Firestore Lite transactions only support Transaction.get(DocumentReference), not Query.
 * Published banner ids are loaded with getDocs before the transaction, then each doc is
 * read again inside the transaction so writes are consistent with those reads.
 */
const listPublishedBannerIds = async ({ source }) => {
    const listResult = await DatabaseService.list({
        source,
        collectionName: 'banners',
        filters: publishedBannersFilter,
        pageSize: PUBLISHED_BANNER_QUERY_LIMIT,
    })
    if (listResult?.err) return listResult
    if (listResult.data.length >= PUBLISHED_BANNER_QUERY_LIMIT) {
        return { err: new Error('Demasiados banners publicados; revisa los datos.') }
    }
    return { data: listResult.data.map((b) => b.id) }
}

const unpublishBannerIdsInTransaction = async ({
    source,
    tx,
    ids,
    exceptId,
}) => {
    const now = new Date()
    for (const bannerId of ids) {
        if (exceptId != null && bannerId === exceptId) continue
        const row = await DatabaseService.getWithTransaction({
            source,
            tx,
            collectionName: 'banners',
            id: bannerId,
        })
        if (!row.data) continue
        await DatabaseService.updateWithTransaction({
            source,
            tx,
            collectionName: 'banners',
            ref: row.ref,
            data: {
                isPublished: false,
                updatedAt: now,
            },
        })
    }
}

const list = ({
    source,
    filters,
    sorters,
    pageSize,
}) => {
    return DatabaseService.list({
        source,
        collectionName: 'banners',
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
        collectionName: 'banners',
        id,
    })
}

const add = async ({
    source,
    data,
}) => {
    const wantsPublish = Boolean(data.isPublished)
    let publishedIds = []
    if (wantsPublish) {
        const publishedListResult = await listPublishedBannerIds({ source })
        if (publishedListResult?.err) return publishedListResult
        publishedIds = publishedListResult.data
    }

    const addResult = await DatabaseService.onTransaction({
        source,
        transaction: async (tx) => {
            try {
                const imageStorageResult = await StorageService.add({
                    source,
                    file: data.image,
                    filePath: storagePath({ name: data.image.name }),
                })
                if (imageStorageResult?.err) throw imageStorageResult.err

                const counterTx = await DatabaseService.getWithTransaction({
                    source,
                    tx,
                    collectionName: 'counters',
                    id: 'banners',
                })

                const count = counterTx?.data
                    ? counterTx.data.count + 1
                    : 1

                const bannerTx = await DatabaseService.getWithTransaction({
                    source,
                    tx,
                    collectionName: 'banners',
                })

                const correlative = getCMSCorrelative({ collectionName: 'banners', count })

                const banner = {
                    pretitle: data.pretitle,
                    title: data.title,
                    description: data.description,
                    image: imageStorageResult.data,
                    count,
                    isPublished: wantsPublish,
                    keywords: keywords({
                        keys: [
                            correlative,
                            data.pretitle,
                            data.title,
                        ].filter(Boolean),
                    }),
                    createdAt: data.createdAt,
                    updatedAt: data.updatedAt,
                }

                if (wantsPublish) {
                    await unpublishBannerIdsInTransaction({
                        source,
                        tx,
                        ids: publishedIds,
                        exceptId: null,
                    })
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
                    ref: bannerTx.ref,
                    data: banner,
                })

                return {
                    id: bannerTx.ref.id,
                    ...banner,
                }
            } catch (err) {
                return Promise.reject(err)
            }
        },
    })

    return addResult
}

const update = async ({
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

    const { id, ...rest } = data
    const wantsPublish = Boolean(rest.isPublished)

    let publishedIds = []
    if (wantsPublish) {
        const publishedListResult = await listPublishedBannerIds({ source })
        if (publishedListResult?.err) return publishedListResult
        publishedIds = publishedListResult.data
    }

    if (wantsPublish) {
        return DatabaseService.onTransaction({
            source,
            transaction: async (tx) => {
                try {
                    await unpublishBannerIdsInTransaction({
                        source,
                        tx,
                        ids: publishedIds,
                        exceptId: id,
                    })

                    const targetTx = await DatabaseService.getWithTransaction({
                        source,
                        tx,
                        collectionName: 'banners',
                        id,
                    })

                    if (!targetTx?.data) throw new Error('Banner no encontrado')

                    await DatabaseService.updateWithTransaction({
                        source,
                        tx,
                        collectionName: 'banners',
                        ref: targetTx.ref,
                        data: rest,
                    })

                    return {
                        id,
                        ...rest,
                    }
                } catch (err) {
                    return Promise.reject(err)
                }
            },
        })
    }

    return DatabaseService.update({
        source,
        collectionName: 'banners',
        data: { id, ...rest },
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
        collectionName: 'banners',
        id,
    })
}

export {
    list,
    get,
    add,
    update,
    remove,
}
