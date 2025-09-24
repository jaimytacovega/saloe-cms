import * as SubCategoryManager from '@/shared/managers/SubCategoryManager'
import { Source } from '@/shared/utils/constants'
import * as Form from '@/shared/components/Form'


const submit = ({
    e,
    srcElement: form,
}) => {
    e.preventDefault()

    const id = form.querySelector('#id').value
    const path = form.querySelector('#path').value

    Form.submit({
        form,
        onProcess: async () => {
            const removeResult = await SubCategoryManager.remove({
                source: Source.FIREBASE,
                id,
                path,
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