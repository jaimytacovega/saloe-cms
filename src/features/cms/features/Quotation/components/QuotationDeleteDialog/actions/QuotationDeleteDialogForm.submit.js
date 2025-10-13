import * as QuotationManager from '@/shared/managers/QuotationManager'
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
            const removeResult = await QuotationManager.remove({
                source: Source.FIREBASE,
                id,
                attachmentPaths,
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