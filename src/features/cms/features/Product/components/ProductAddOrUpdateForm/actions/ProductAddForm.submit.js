import * as ProductHook from '@/shared/hooks/ProductHook'

import * as Form from '@/shared/components/Form'
import { Source } from '@/shared/utils/constants'
import { searchParamsToListArguments } from '@/shared/services/DatabaseService'


const submit = ({
    e,
    srcElement: form,
}) => {
    e.preventDefault()

    const name = form.querySelector('#name').value.trim()
    const sku = form.querySelector('#sku').value.trim()
    const description = form.querySelector('#description').value.trim()
    const image = form.querySelector('#image').files[0]
    const subCategoryIds = Array.from(form.querySelector('#subCategoryIds').selectedOptions).map((option) => option.value.trim())
    const brandIds = Array.from(form.querySelector('#brandIds').selectedOptions).map((option) => option.value.trim())
    const technicalSheet = form.querySelector('#technicalSheet').files[0]
    const seoTitle = form.querySelector('#seo-title').value.trim()
    const seoDescription = form.querySelector('#seo-description').value.trim()
    const seoSlug = form.querySelector('#seo-slug').value.trim()
    const seoIndexFollow = form.querySelector('#seo-index-follow').checked
    const now = new Date()

    const product = {
        name,
        sku,
        description,
        image,
        subCategoryIds,
        brandIds,
        technicalSheet,
        seoTitle,
        seoDescription,
        seoSlug,
        seoIndexFollow,
        createdAt: now,
        updatedAt: now,
    }

    Form.submit({
        form,
        onProcess: async () => {
            const listArguments = searchParamsToListArguments({
                searchParams: (new URL(location.href)).searchParams,
            })

            const addResult = await ProductHook.useAdd({
                source: Source.FIREBASE,
                data: product,
                ...listArguments,
            })

            if (addResult?.err) throw addResult.err
            return addResult
        },
        onSuccess: ({ result }) => {    
            location.href = `/cms/productos/${result.data.id}${location.search}`
        },
    })
}


export {
    submit,
}