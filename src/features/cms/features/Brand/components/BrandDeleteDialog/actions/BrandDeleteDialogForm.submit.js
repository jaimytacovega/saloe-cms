import * as BrandRepository from '@/shared/repositories/BrandRepository'
import { Source } from '@/shared/utils/constants'
import * as Form from '@/shared/components/Form'
import { DeleteBrandSchema } from '@/shared/schemas/BrandSchema'
import { prettifyError } from '@/shared/schemas/utils/utils'


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
            const schemaResult = DeleteBrandSchema.safeParse({ id, path })
            if (!schemaResult.success) throw prettifyError({ error: schemaResult.error })

            const removeResult = await BrandRepository.remove({
                source: Source.FIREBASE,
                id,
                path,
            })

            if (removeResult.err) throw removeResult.err
            return removeResult
        },
        onSuccess: () => {
            location.href = '/cms/marcas'
        },
    })
}

export {
    submit,
}