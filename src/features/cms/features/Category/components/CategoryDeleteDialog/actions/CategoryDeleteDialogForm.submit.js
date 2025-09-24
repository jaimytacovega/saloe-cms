import * as CategoryManager from '@/shared/managers/CategoryManager'
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
            const removeResult = await CategoryManager.remove({
                source: Source.FIREBASE,
                id,
                imagePath,
                catalogPaths,
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