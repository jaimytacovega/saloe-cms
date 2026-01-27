import { update as updateQuotation } from '@/features/web/components/WebQuotationDialog'

const click = async ({
    e,
    srcElement,
}) => {
    e.preventDefault()

    const dialogId = 'WebQuotationDialog'

    await updateQuotation()

    const dialog = document.getElementById(dialogId)
    if (dialog) dialog.showPopover()
}

export {
    click,
}