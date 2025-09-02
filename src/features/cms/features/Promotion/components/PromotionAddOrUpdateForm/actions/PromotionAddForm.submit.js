import * as PromotionHook from '@/shared/hooks/PromotionHook'

import * as Form from '@/shared/components/Form'
import { Source } from '@/shared/utils/constants'
import { keywords } from '@/shared/utils/utils'
import { searchParamsToListArguments } from '@/shared/services/DatabaseService'


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
    const now = new Date()

    const promotion = {
        name,
        description,
        image,  
        brandId,
        // TODO: categoryIds
        keywords: keywords({ keys: [name] }),
        createdAt: now,
        updatedAt: now,
    }

    Form.submit({
        form,
        onProcess: async () => {
            const listArguments = searchParamsToListArguments({
                searchParams: (new URL(location.href)).searchParams,
            })

            const addResult = await PromotionHook.useAdd({
                source: Source.FIREBASE,
                data: promotion,
                ...listArguments,
            })

            if (addResult?.err) throw addResult.err
            return addResult
        },
        onSuccess: ({ result }) => {    
            location.href = `/cms/promociones/${result.data.id}${location.search}`
        },
    })
}


export {
    submit,
}