import * as CategoryHook from '@/shared/hooks/CategoryHook'

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
    const description = form.querySelector('#description').value.trim()
    const name = form.querySelector('#name').value.trim()
    const imagePath = form.querySelector('#imagePath').value.trim()
    const image = form.querySelector('#image').files[0]
    const subCategoryIds = Array.from(form.querySelector('#subCategoryIds').selectedOptions).map((option) => option.value.trim())
    const brandIds = Array.from(form.querySelector('#brandIds').selectedOptions).map((option) => option.value.trim())
    const promotionIds = Array.from(form.querySelector('#promotionIds').selectedOptions).map((option) => option.value.trim())
    
    const catalogs = Array.from(form.querySelector('#catalogs').files)
    const catalogsToRemoveJson = JSON.parse(
        decodeURIComponent(
            form.querySelector('#catalogs__filesToRemove').value
        )
    )
    const catalogsToRemove = Object.keys(catalogsToRemoveJson)
    const catalogsToKeep = JSON.parse(
        decodeURIComponent(
            form.querySelector('#catalogs__oldFiles').value
        )
    ).filter((catalog) => !catalogsToRemoveJson[catalog.path])

    const category = {
        id,
        name,
        description,
        subCategoryIds,
        brandIds,
        promotionIds,
        image,
        imagePath,
        catalogs,
        catalogsToKeep,
        catalogsToRemove,
        keywords: keywords({ keys: [name, description] }),
        updatedAt: new Date(),
    }

    Form.submit({
        form,
        onProcess: async () => {
            const listArguments = searchParamsToListArguments({
                searchParams: (new URL(location.href)).searchParams,
            })

            const updateResult = await CategoryHook.useUpdate({
                source: Source.FIREBASE,
                data: category,
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