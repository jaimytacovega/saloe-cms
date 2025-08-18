import * as CategoryRepository from '@/shared/repositories/CategoryRepository'
import { Source } from '@/shared/utils/constants'
import * as Form from '@/shared/components/Form'


const submit = async ({
    e,
    srcElement: form,
}) => {
    e.preventDefault()

    const id = form.querySelector('#id').value.trim()
    const name = form.querySelector('#name').value.trim()
    const code = form.querySelector('#code').value.trim()

    const category = {
        id,
        name,
        code,
        updatedAt: new Date(),
    }

    Form.submit({
        form,
        onProcess: async () => {
            const updateResult = await CategoryRepository.update({
                source: Source.FIREBASE,
                data: category,
            })

            if (updateResult?.err) throw updateResult.err
            return updateResult
        },
        onSuccess: () => {
            location.reload()
        },
    })
}

export {
    submit,
}