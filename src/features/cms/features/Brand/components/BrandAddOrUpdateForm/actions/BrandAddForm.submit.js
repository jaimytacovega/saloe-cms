import * as Form from '@/shared/components/Form'
import { Source } from '@/shared/utils/constants'
import { keywords } from '@/shared/utils/utils'
import * as BrandManager from '@/shared/managers/BrandManager'


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
            const addResult = await BrandManager.add({
                source: Source.FIREBASE,
                data: brand,
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