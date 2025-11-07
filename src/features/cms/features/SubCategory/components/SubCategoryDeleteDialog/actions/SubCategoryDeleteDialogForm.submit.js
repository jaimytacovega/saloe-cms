import * as SubCategoryHook from '@/shared/hooks/SubCategoryHook'
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

    Form.submit({
        form,
        onProcess: async () => {
            const listArguments = searchParamsToListArguments({
                searchParams: (new URL(location.href)).searchParams,
            })

            const removeResult = await SubCategoryHook.useRemove({
                source: Source.FIREBASE,
                id,
                imagePath,
                ...listArguments,
            })

            if (removeResult.err) throw removeResult.err
            return removeResult
        },
        onSuccess: () => {
            location.href = `/cms/subcategorias${location.search}`
        },
    })
}

export {
    submit,
}