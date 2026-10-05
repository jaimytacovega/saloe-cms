import * as QuotationHook from '@/shared/hooks/QuotationHook'
import * as Form from '@/shared/components/Form'
import Toast, { showToast } from '@/shared/components/Toast'

import { Source } from '@/shared/utils/constants'
import { searchParamsToListArguments } from '@/shared/services/DatabaseService'
import { QUOTATION_TYPES, QUOTATION_STATUSES } from '@/shared/repositories/QuotationRepository'
import { get as getQuotation } from '@/features/web/components/WebQuotation'
import { unfill as unfillQuotationDialog } from '@/features/web/components/WebQuotationDialog'


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
    const draft = getQuotation()
    const now = new Date()

    const quotation = {
        client: {
            name,
            code,
            email,
            phone,
            type: clientType,
        },
        clientType,
        attachments,
        request,
        deliveryLocation,
        subCategoryIds: draft.subCategoryIds ?? [],
        promotionIds,
        type: QUOTATION_TYPES.ONLINE,
        status: QUOTATION_STATUSES.PENDING,
        createdAt: now,
        updatedAt: now,
    }

    Form.submit({
        form,
        onProcess: async () => {
            const listArguments = searchParamsToListArguments({
                searchParams: (new URL(location.href)).searchParams,
            })

            const addResult = await QuotationHook.useAdd({
                source: Source.FIREBASE,
                data: quotation,
                ...listArguments,
            })

            if (addResult?.err) throw addResult.err
            return addResult
        },
        onSuccess: async () => {
            await unfillQuotationDialog()

            form.removeAttribute('submitting')
            form.closest('dialog')?.hidePopover()

            const toastId = 'WebQuotationDialogToast'
            document.body.querySelector('main')?.insertAdjacentHTML('beforeend', Toast({
                id: toastId,
                message: 'Cotización enviada',
            }))
            showToast({
                toastId,
                toastTimeout: 2_500,
            })
        },
    })
}

export {
    submit,
}
