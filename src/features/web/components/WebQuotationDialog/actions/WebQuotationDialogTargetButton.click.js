import { fill as fillQuotation } from '@/features/web/components/WebQuotationDialog'


const click = async ({
    e,
    srcElement,
}) => {
    e.preventDefault()

    const dialogId = 'WebQuotationDialog'

    await fillQuotation()

    const dialog = document.getElementById(dialogId)
    if (dialog) dialog.showPopover()
}

export {
    click,
}