import * as CategoryHook from '@/shared/hooks/CategoryHook'
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
    const catalogPaths = form.querySelector('#catalogPaths').value.split(',')

    Form.submit({
        form,
        onProcess: async () => {
            const listArguments = searchParamsToListArguments({
                searchParams: (new URL(location.href)).searchParams,
            })

            const removeResult = await CategoryHook.useRemove({
                source: Source.FIREBASE,
                id,
                imagePath,
                catalogPaths,
                ...listArguments,
            })

            if (removeResult.err) throw removeResult.err
            return removeResult
        },
        onSuccess: () => {
            location.href = `/cms/categorias${location.search}`
        },
    })
}

export {
    submit,
}