import { Source } from '@/shared/utils/constants'
import * as Form from '@/shared/components/Form'
import { keywords } from '@/shared/utils/utils'

import * as SubCategoryHook from '@/shared/hooks/SubCategoryHook'


const submit = ({
    e,
    srcElement: form,
}) => {
    e.preventDefault()

    const id = form.querySelector('#id').value.trim()
    const name = form.querySelector('#name').value.trim()
    const description = form.querySelector('#description').value.trim()
    const oldPath = form.querySelector('#path').value.trim()
    const image = form.querySelector('#image').files[0]
    const categoryIds = Array.from(form.querySelector('#categoryIds').selectedOptions).map((option) => option.value.trim())
    const seoKeywords = form.querySelector('#seoKeywords').value.trim()

    const subCategory = {
        id,
        name,
        description,
        image,
        oldPath,
        categoryIds,
        seoKeywords,
        keywords: keywords({ keys: [name, description, seoKeywords] }),
        updatedAt: new Date(),
    }

    Form.submit({
        form,
        onProcess: async () => {
            const updateResult = await SubCategoryHook.useUpdate({
                source: Source.FIREBASE,
                data: subCategory,
            })

            if (updateResult?.err) throw updateResult.err
            return updateResult
        },
        onSuccess: () => {
            // location.reload()
        },
    })
}

export {
    submit,
}