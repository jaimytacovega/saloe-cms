import * as CategoryRepository from '@/shared/repositories/CategoryRepository'
import { Source } from '@/shared/utils/constants'
import * as Form from '@/shared/components/Form'


const submit = async ({
    e,
    srcElement: form,
}) => {
    e.preventDefault()

    const name = form.querySelector('#name').value.trim()
    const code = form.querySelector('#code').value.trim()

    const category = {
        name,
        code,
        createdAt: new Date(),
    }

    Form.submit({
        form,
        onProcess: async () => {
            const addResult = await CategoryRepository.add({
                source: Source.FIREBASE,
                data: category,
            })

            if (addResult?.err) throw addResult.err
            return addResult
        },
        onSuccess: ({ result }) => {
            location.href = `/cms/categorias/${result.data.id}`
        },
    })
}


export {
    submit,
}