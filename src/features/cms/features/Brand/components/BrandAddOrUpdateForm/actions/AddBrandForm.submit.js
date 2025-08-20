import * as Form from '@/shared/components/Form'

import * as BrandRepository from '@/shared/repositories/BrandRepository'
import { Source } from '@/shared/utils/constants'
import { keywords } from '@/shared/utils/utils'
import { AddBrandSchema } from '@/shared/schemas/BrandSchema'
import { getError } from '@/shared/schemas/utils/utils'


const submit = ({
    e,
    srcElement: form,
}) => {
    e.preventDefault()

    const name = form.querySelector('#name').value.trim()
    const image = form.querySelector('#image').files[0]

    const brand = {
        name,
        image,
        keywords: keywords({ keys: [name] }),
        createdAt: new Date(),
    }


    Form.submit({
        form,
        onProcess: async () => {
            const schemaResult = AddBrandSchema.safeParse(brand)
            if (!schemaResult.success) throw getError({ error: schemaResult.error })

            const addResult = await BrandRepository.add({
                source: Source.FIREBASE,
                data: schemaResult.data,
            })

            if (addResult?.err) throw addResult.err
            return addResult
        },
        onSuccess: ({ result }) => {    
            location.href = `/cms/marcas/${result.data.id}`
        },
    })
}


export {
    submit,
}