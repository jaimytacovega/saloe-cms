import Toast, { showToast } from '@/shared/components/Toast'
import { get as getQuotation, update as updateQuotation } from '@/features/web/components/WebQuotation'
import { AddToQuotationButtonTypes } from '@/features/web/components/WebAddToQuotationButton'


const click = async ({
    e,
    srcElement,
}) => {
    e.preventDefault()

    const button = srcElement.closest('button')
    const toastId = button.getAttribute('data-toast-id')
    const toastMessage = button.getAttribute('data-toast-message')
    const toastTimeout = parseInt(button.getAttribute('data-toast-timeout'))
    const itemId = button.getAttribute('data-item-id')
    const itemType = button.getAttribute('data-item-type')

    const toastHtml = Toast({
        id: toastId,
        message: toastMessage,
        timeout: toastTimeout,
        dataAttributes: `data-item-id="${itemId}" data-item-type="${itemType}"`
    })

    document.body.querySelector('main').insertAdjacentHTML('beforeend', toastHtml)

    showToast({
        toastId,
        toastTimeout,
    })

    const quotation = getQuotation()

    console.log('pre quotation =', quotation)

    if (itemType === AddToQuotationButtonTypes.SubCategory) {
        quotation.subCategoryIds.push(itemId)
    } else if (itemType === AddToQuotationButtonTypes.Promotion) {
        quotation.promotionIds.push(itemId)
    }

    console.log('post quotation =', quotation)

    updateQuotation({
        data: quotation,
    })
}

export {
    click,
}