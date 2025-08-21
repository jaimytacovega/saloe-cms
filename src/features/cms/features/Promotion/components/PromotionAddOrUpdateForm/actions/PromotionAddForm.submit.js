import * as Form from '@/shared/components/Form'
import { Source } from '@/shared/utils/constants'
import { keywords } from '@/shared/utils/utils'
import * as PromotionManager from '@/shared/managers/PromotionManager'


const submit = ({
    e,
    srcElement: form,
}) => {
    e.preventDefault()

    const name = form.querySelector('#name').value.trim()
    const description = form.querySelector('#description').value.trim()
    const image = form.querySelector('#image').files[0]
    const brandId = form.querySelector('#brandId').selectedOptions[0].value.trim()
    // TODO: categoryIds

    const promotion = {
        name,
        description,
        image,  
        brandId,
        // TODO: categoryIds
        keywords: keywords({ keys: [name] }),
        createdAt: new Date(),
    }

    Form.submit({
        form,
        onProcess: async () => {
            const addResult = await PromotionManager.add({
                source: Source.FIREBASE,
                data: promotion,
            })

            if (addResult?.err) throw addResult.err
            return addResult
        },
        onSuccess: ({ result }) => {    
            location.href = `/cms/promociones/${result.data.id}`
        },
    })
}


export {
    submit,
}