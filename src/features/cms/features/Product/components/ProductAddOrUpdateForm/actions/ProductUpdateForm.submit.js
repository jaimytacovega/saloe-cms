import * as ProductHook from '@/shared/hooks/ProductHook'

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
    const sku = form.querySelector('#sku').value.trim()
    const name = form.querySelector('#name').value.trim()
    const imagePath = form.querySelector('#imagePath').value.trim()
    const image = form.querySelector('#image').files[0]
    const subCategoryIds = Array.from(form.querySelector('#subCategoryIds').selectedOptions).map((option) => option.value.trim())
    const brandIds = Array.from(form.querySelector('#brandIds').selectedOptions).map((option) => option.value.trim())
    const technicalSheetPath = form.querySelector('#technicalSheetPath').value.trim()
    const technicalSheet = form.querySelector('#technicalSheet').files[0]

    const product = {
        id,
        name,
        sku,
        image,
        imagePath,
        subCategoryIds,
        brandIds,
        technicalSheetPath,
        technicalSheet,
        keywords: keywords({ 
            keys: [
                correlative,
                name,
                sku.substring(0, 4),
                sku.substring(4),
            ] 
        }),
        updatedAt: new Date(),
    }

    Form.submit({
        form,
        onProcess: async () => {
            const listArguments = searchParamsToListArguments({
                searchParams: (new URL(location.href)).searchParams,
            })

            const updateResult = await ProductHook.useUpdate({
                source: Source.FIREBASE,
                data: product,
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