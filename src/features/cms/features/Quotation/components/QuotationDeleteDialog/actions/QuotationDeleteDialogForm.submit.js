import * as QuotationHook from '@/shared/hooks/QuotationHook'
import { searchParamsToListArguments } from '@/shared/services/DatabaseService'
import { Source } from '@/shared/utils/constants'
import * as Form from '@/shared/components/Form'


const submit = ({
    e,
    srcElement: form,
}) => {
    e.preventDefault()

    const id = form.querySelector('#id').value
    const attachmentPaths = form.querySelector('#attachmentPaths').value.split(',')

    Form.submit({
        form,
        onProcess: async () => {
            const listArguments = searchParamsToListArguments({
                searchParams: (new URL(location.href)).searchParams,
            })

            const removeResult = await QuotationHook.useRemove({
                source: Source.FIREBASE,
                id,
                attachmentPaths,
                ...listArguments,
            })

            if (removeResult.err) throw removeResult.err
            return removeResult
        },
        onSuccess: () => {
            location.href = `/cms/cotizaciones${location.search}`
        },
    })
}

export {
    submit,
}