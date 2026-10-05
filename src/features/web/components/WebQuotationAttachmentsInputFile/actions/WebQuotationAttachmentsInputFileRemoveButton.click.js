import { remove, fill } from '@/features/web/components/WebQuotationAttachmentsInputFile'


const click = async ({
    e,
    srcElement: button,
}) => {
    e.preventDefault()

    const id = button.getAttribute('data-path')
    const inputId = button.getAttribute('data-id')

    await remove({ id })
    await fill({ id: inputId })
}

export {
    click,
}
