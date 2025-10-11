import * as OrderHook from '@/shared/hooks/OrderHook'

import * as Form from '@/shared/components/Form'
import { Source } from '@/shared/utils/constants'
import { keywords } from '@/shared/utils/utils'
import { searchParamsToListArguments } from '@/shared/services/DatabaseService'


const submit = ({
    e,
    srcElement: form,
}) => {
    e.preventDefault()

    const name = form.querySelector('#clientName').value.trim()
    const code = form.querySelector('#clientCode').value.trim() 
    const email = form.querySelector('#clientEmail').value.trim()
    const phone = form.querySelector('#clientPhone').value.trim()
    const clientType = form.querySelector('#clientType').value.trim()
    const attachments = Array.from(form.querySelector('#attachments').files)
    const request = form.querySelector('#request').value.trim()
    const deliveryLocation = form.querySelector('#deliveryLocation').value.trim()
    const promotionIds = Array.from(form.querySelector('#promotionIds').selectedOptions).map((option) => option.value.trim())
    const type = form.querySelector('#type').value.trim()
    const status = form.querySelector('#status').value.trim()
    const now = new Date()

    const order = {
        client: {
            name,
            code,
            email,
            phone,
            type: clientType,
        },
        attachments,
        request,
        deliveryLocation,
        promotionIds,
        type,
        status,
        keywords: keywords({ keys: [name, code, email, phone, type, status] }),
        createdAt: now,
        updatedAt: now,
    }

    Form.submit({
        form,
        onProcess: async () => {
            const listArguments = searchParamsToListArguments({
                searchParams: (new URL(location.href)).searchParams,
            })

            const addResult = await OrderHook.useAdd({
                source: Source.FIREBASE,
                data: order,
                ...listArguments,
            })

            if (addResult?.err) throw addResult.err
            return addResult
        },
        onSuccess: ({ result }) => {    
            location.href = `/cms/cotizaciones/${result.data.id}${location.search}`
        },
    })
}


export {
    submit,
}