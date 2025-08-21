import { Source } from '@/shared/utils/constants'
import * as Form from '@/shared/components/Form'
import { keywords } from '@/shared/utils/utils'

import * as PromotionManager from '@/shared/managers/PromotionManager'


const submit = ({
    e,
    srcElement: form,
}) => {
    e.preventDefault()

    const id = form.querySelector('#id').value.trim()
    const name = form.querySelector('#name').value.trim()
    const description = form.querySelector('#description').value.trim()
    const brandId = form.querySelector('#brandId').selectedOptions[0].value.trim()
    const oldPath = form.querySelector('#path').value.trim()
    const image = form.querySelector('#image').files[0]

    const promotion = {
        id,
        name,
        description,
        brandId,
        image,
        oldPath,
        keywords: keywords({ keys: [name] }),
        updatedAt: new Date(),
    }

    Form.submit({
        form,
        onProcess: async () => {
            const updateResult = await PromotionManager.update({
                source: Source.FIREBASE,
                data: promotion,
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