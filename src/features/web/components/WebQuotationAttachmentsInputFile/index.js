import * as DatabaseService from '@/shared/services/DatabaseService'
import { Source } from '@/shared/utils/constants'

import InputFile, { renderUploadFiles } from '@/shared/components/InputFile'
import { get as getQuotation, update as updateQuotation } from '@/features/web/components/WebQuotation'


const COLLECTION_NAME = 'attachments'
const REMOVE_CLICK = 'WebQuotationAttachmentsInputFileRemoveButton.click'


const list = async ({
    ids,
}) => {
    if (!ids?.length) return { records: [] }

    const result = await DatabaseService.list({
        source: Source.INDEXEDDB,
        collectionName: COLLECTION_NAME,
        filters: [{
            field: 'id',
            operator: DatabaseService.Operators.In,
            value: ids,
        }],
    })

    if (result?.err || !Array.isArray(result?.data)) return { records: [], err: result?.err }

    const recordsById = new Map(result.data.map((record) => [record.id, record]))

    return {
        records: ids
            .map((id) => recordsById.get(id))
            .filter((record) => record?.file),
    }
}

const add = async ({
    files,
}) => {
    const quotation = getQuotation()
    const ids = [...(quotation.attachments ?? [])]

    for (const file of files) {
        const result = await DatabaseService.add({
            source: Source.INDEXEDDB,
            collectionName: COLLECTION_NAME,
            data: {
                name: file.name,
                type: file.type,
                lastModified: file.lastModified,
                file,
            },
        })

        if (result?.data?.id) ids.push(result.data.id)
    }

    updateQuotation({
        data: {
            attachments: ids,
        },
    })
}

const remove = async ({
    id,
}) => {
    await DatabaseService.remove({
        source: Source.INDEXEDDB,
        collectionName: COLLECTION_NAME,
        id,
    })

    const quotation = getQuotation()

    updateQuotation({
        data: {
            attachments: (quotation.attachments ?? []).filter((attachmentId) => attachmentId !== id),
        },
    })
}

const fill = async ({
    id,
}) => {
    const input = document?.getElementById(id)
    if (!input) return

    const quotation = getQuotation()
    const ids = Array.isArray(quotation.attachments) ? quotation.attachments : []
    const listed = await list({ ids })
    if (listed?.err) return

    const records = listed.records ?? []
    const foundIds = records.map((record) => record.id)

    if (foundIds.length !== ids.length) {
        updateQuotation({
            data: {
                attachments: foundIds,
            },
        })
    }

    renderUploadFiles({
        id,
        files: records.map((record) => ({
            name: record.name,
            path: record.id,
        })),
        inputFiles: records.map((record) => toFile({ record })).filter(Boolean),
        onClick: REMOVE_CLICK,
    })
}

const toFile = ({
    record,
}) => {
    if (!record?.file) return null
    if (record.file instanceof File) return record.file

    return new File([record.file], record.name, {
        type: record.type || 'application/pdf',
        ...(Number.isFinite(record.lastModified) && { lastModified: record.lastModified }),
    })
}

const WebQuotationAttachmentsInputFile = () => {
    return InputFile({
        id: 'attachments',
        label: 'Pedido adjunto (opcional)',
        type: 'file',
        accept: 'application/pdf',
        acceptLabel: 'PDF',
        multiple: true,
        files: [],
        onChange: 'WebQuotationAttachmentsInputFile.change',
    })
}

export default WebQuotationAttachmentsInputFile

export {
    add,
    remove,
    fill,
}
