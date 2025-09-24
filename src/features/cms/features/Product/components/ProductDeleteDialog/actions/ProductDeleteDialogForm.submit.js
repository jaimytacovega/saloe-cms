import * as ProductManager from '@/shared/managers/ProductManager'
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
            const removeResult = await ProductManager.remove({
                source: Source.FIREBASE,
                id,
                imagePath,
                technicalSheetPath,
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