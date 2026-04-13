import { get as getQuotation, update as updateQuotation } from '@/features/web/components/WebQuotation'


const getData = ({
    quotation,
    field,
    value,
}) => {
    if (field === 'clientName') return {
        client: {
            ...quotation.client,
            name: value,
        },
    }

    if (field === 'clientCode') return {
        client: {
            ...quotation.client,
            code: value,
        },
    }

    if (field === 'clientEmail') return {
        client: {
            ...quotation.client,
            email: value,
        },
    }

    if (field === 'clientPhone') return {
        client: {
            ...quotation.client,
            phone: value,
        },
    }

    if (field === 'clientType') return {
        client: {
            ...quotation.client,
            type: value,
        },
    }

    return {
        ...quotation,
        [field]: value,
    }
}

const change = ({
    e,
    srcElement,
}) => {
    const input = srcElement.closest(':is(input, select, textarea)')
    const field = input.getAttribute('data-field')
    const value = input.value

    console.log('field =', field)
    console.log('value =', value)

    const quotation = getQuotation()
    
    updateQuotation({
        data: getData({ quotation, field, value }),
    })
}

export {
    change,
}