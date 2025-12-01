import * as CategoryHook from '@/shared/hooks/CategoryHook'

import * as Form from '@/shared/components/Form'
import { Source } from '@/shared/utils/constants'
import { searchParamsToListArguments } from '@/shared/services/DatabaseService'


const submit = ({
    e,
    srcElement: form,
}) => {
    e.preventDefault()

    const name = form.querySelector('#name').value.trim()
    const description = form.querySelector('#description').value.trim()
    const image = form.querySelector('#image').files[0]
    const subCategoryIds = Array.from(form.querySelector('#subCategoryIds').selectedOptions).map((option) => option.value.trim())
    const brandIds = Array.from(form.querySelector('#brandIds').selectedOptions).map((option) => option.value.trim())
    const promotionIds = Array.from(form.querySelector('#promotionIds').selectedOptions).map((option) => option.value.trim())
    const catalogs = Array.from(form.querySelector('#catalogs').files)
    const now = new Date()

    const category = {
        name,
        description,
        subCategoryIds,
        brandIds,
        promotionIds,
        catalogs,
        image,
        createdAt: now,
        updatedAt: now,
    }

    Form.submit({
        form,
        onProcess: async () => {
            const listArguments = searchParamsToListArguments({
                searchParams: (new URL(location.href)).searchParams,
            })

            const addResult = await CategoryHook.useAdd({
                source: Source.FIREBASE,
                data: category,
                ...listArguments,
            })

            if (addResult?.err) throw addResult.err
            return addResult
        },
        onSuccess: ({ result }) => {    
            location.href = `/cms/categorias/${result.data.id}${location.search}`
        },
    })
}


export {
    submit,
}