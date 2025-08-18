import * as CategoryRepository from '@/shared/repositories/CategoryRepository'
import { Source } from '@/shared/utils/constants'
import * as Form from '@/shared/components/Form'


const submit = ({
    e,
    srcElement: form,
}) => {
    e.preventDefault()

    const categoryId = form.querySelector('#categoryId').value

    Form.submit({
        form,
        onProcess: async () => {
            const removeResult = await CategoryRepository.remove({
                source: Source.FIREBASE,
                id: categoryId,
            })

            if (removeResult.err) throw removeResult.err
            return removeResult
        },
        onSuccess: () => {
            location.href = '/cms/categorias'
        },
    })
}

export {
    submit,
}