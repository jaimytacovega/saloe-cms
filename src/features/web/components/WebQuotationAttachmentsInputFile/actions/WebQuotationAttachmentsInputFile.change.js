import { add, fill } from '@/features/web/components/WebQuotationAttachmentsInputFile'


const change = async ({
    e,
    srcElement: input,
}) => {
    e.preventDefault()

    const files = Array.from(input.files ?? [])
    if (!files.length) return

    await add({ files })
    await fill({ id: input.id })
}

export {
    change,
}
