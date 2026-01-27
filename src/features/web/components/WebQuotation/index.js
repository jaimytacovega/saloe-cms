import { QUOTATION_TYPES, QUOTATION_STATUSES, CLIENT_TYPES } from '@/shared/repositories/QuotationRepository'


const update = ({       
    data,
}) => {
    const quotation = {
        ...get(),
        ...data,
        updatedAt: new Date(),
    }

    localStorage.setItem('WebQuotation', JSON.stringify(quotation))
}

const get = () => {
    const quotationData = localStorage.getItem('WebQuotation')
    if (!quotationData) {
        init()
        return get()
    }

    const parsed = JSON.parse(quotationData)
    const now = new Date()

    return {
        ...parsed,
        createdAt: new Date(parsed.createdAt ?? now),
        updatedAt: new Date(parsed.updatedAt ?? now),
    }
}

const init = () => {
    const now = new Date()
    const quotationData = {
        client: {
            name: '',
            code: '',
            email: '',
            phone: '',
            type: CLIENT_TYPES.OTHER,
        },
        clientType: CLIENT_TYPES.OTHER,
        attachments: [],
        request: '',
        deliveryLocation: '',
        subCategoryIds: [],
        promotionIds: [],
        type: QUOTATION_TYPES.WEB,
        status: QUOTATION_STATUSES.PENDING,
        createdAt: now,
        updatedAt: now,
    }

    localStorage.setItem('WebQuotation', JSON.stringify(quotationData))
}

const WebQuotation = () => {
    return ''
}

export default WebQuotation

export {
    init,
    get,
    update,
}