import * as BrandManager from '@/shared/managers/BrandManager'
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
            const removeResult = await BrandManager.remove({
                source: Source.FIREBASE,
                id,
                imagePath,
            })

            if (removeResult.err) throw removeResult.err
            return removeResult
        },
        onSuccess: () => {
            location.href = `/cms/marcas${location.search}`
        },
    })
}

export {
    submit,
}