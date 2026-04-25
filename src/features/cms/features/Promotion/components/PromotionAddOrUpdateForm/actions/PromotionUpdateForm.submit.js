import * as PromotionHook from '@/shared/hooks/PromotionHook'

import { Source } from '@/shared/utils/constants'
import * as Form from '@/shared/components/Form'
import { keywords } from '@/shared/utils/utils'
import { searchParamsToListArguments } from '@/shared/services/DatabaseService'


const submit = ({
    e,
    srcElement: form,
}) => {
    e.preventDefault()

    const id = form.querySelector('#id').value.trim()
    const correlative = form.querySelector('#correlative').value.trim()
    const name = form.querySelector('#name').value.trim()
    const description = form.querySelector('#description').value.trim()
    const reward = form.querySelector('#reward').value.trim()
    const brandId = form.querySelector('#brandId').selectedOptions[0].value.trim()
    const imagePath = form.querySelector('#imagePath').value.trim()
    const image = form.querySelector('#image').files[0]

    const promotion = {
        id,
        name,
        description,
        reward,
        brandId,
        image,
        imagePath,
        keywords: keywords({ 
            keys: [
                correlative,
                name,
            ] 
        }),
        updatedAt: new Date(),
    }

    Form.submit({
        form,
        onProcess: async () => {
            const listArguments = searchParamsToListArguments({
                searchParams: (new URL(location.href)).searchParams,
            })

            const updateResult = await PromotionHook.useUpdate({
                source: Source.FIREBASE,
                data: promotion,
                ...listArguments,
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