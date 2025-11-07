import * as ProductHook from '@/shared/hooks/ProductHook'
import { searchParamsToListArguments } from '@/shared/services/DatabaseService'
import { Source } from '@/shared/utils/constants'
import * as Form from '@/shared/components/Form'


const submit = ({
    e,
    srcElement: form,
}) => {
    e.preventDefault()

    const id = form.querySelector('#id').value
    const imagePath = form.querySelector('#imagePath').value
    const technicalSheetPath = form.querySelector('#technicalSheetPath').value

    Form.submit({
        form,
        onProcess: async () => {
            const listArguments = searchParamsToListArguments({
                searchParams: (new URL(location.href)).searchParams,
            })

            const removeResult = await ProductHook.useRemove({
                source: Source.FIREBASE,
                id,
                imagePath,
                technicalSheetPath,
                ...listArguments,
            })

            if (removeResult.err) throw removeResult.err
            return removeResult
        },
        onSuccess: () => {
            location.href = `/cms/productos${location.search}`
        },
    })
}

export {
    submit,
}