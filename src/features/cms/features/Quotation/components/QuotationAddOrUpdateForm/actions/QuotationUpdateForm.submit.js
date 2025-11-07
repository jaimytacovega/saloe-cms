import * as QuotationHook from '@/shared/hooks/QuotationHook'

import { Source } from '@/shared/utils/constants'
import * as Form from '@/shared/components/Form'
import { keywords } from '@/shared/utils/utils'
import { searchParamsToListArguments } from '@/shared/services/DatabaseService'


const submit = ({
    e,
    srcElement: form,
}) => {
    e.preventDefault()

    const id = form.querySelector('#id').value.trim()
    const correlative = form.querySelector('#correlative').value.trim()
    const clientName = form.querySelector('#clientName').value.trim()
    const clientCode = form.querySelector('#clientCode').value.trim()
    const clientEmail = form.querySelector('#clientEmail').value.trim()
    const clientPhone = form.querySelector('#clientPhone').value.trim()
    const clientType = form.querySelector('#clientType').value.trim()

    const attachments = Array.from(form.querySelector('#attachments').files)
    const request = form.querySelector('#request').value.trim()
    const deliveryLocation = form.querySelector('#deliveryLocation').value.trim()
    const attachmentsToRemoveJson = JSON.parse(
        decodeURIComponent(
            form.querySelector('#attachments__filesToRemove').value
        )
    )
    const attachmentsToRemove = Object.keys(attachmentsToRemoveJson)
    const attachmentsToKeep = JSON.parse(
        decodeURIComponent(
            form.querySelector('#attachments__oldFiles').value
        )
    ).filter((catalog) => !attachmentsToRemoveJson[catalog.path])

    const promotionIds = Array.from(form.querySelector('#promotionIds').selectedOptions).map((option) => option.value.trim())
    const type = form.querySelector('#type').value.trim()
    const status = form.querySelector('#status').value.trim()

    const quotation = {
        id,
        client: {
            name: clientName,
            code: clientCode,
            email: clientEmail,
            phone: clientPhone,
            type: clientType,
        },
        clientType,
        attachments,
        attachmentsToKeep,
        attachmentsToRemove,
        request,
        deliveryLocation,
        promotionIds,
        type,
        status,
        keywords: keywords({ 
            keys: [
                correlative,
                clientName,
                clientCode, 
                clientEmail, 
                clientPhone, 
                deliveryLocation
            ], 
        }),
        updatedAt: new Date(),
    }

    Form.submit({
        form,
        onProcess: async () => {
            const listArguments = searchParamsToListArguments({
                searchParams: (new URL(location.href)).searchParams,
            })

            const updateResult = await QuotationHook.useUpdate({
                source: Source.FIREBASE,
                data: quotation,
                ...listArguments,
            })

            if (updateResult?.err) throw updateResult.err
            return updateResult
        },
        onSuccess: () => {
            location.reload()
        },
    })
}

export {
    submit,
}