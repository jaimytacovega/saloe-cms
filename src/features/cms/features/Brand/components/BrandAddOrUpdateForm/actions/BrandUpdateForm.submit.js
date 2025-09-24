import * as BrandHook from '@/shared/hooks/BrandHook'

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
    const name = form.querySelector('#name').value.trim()
    const imagePath = form.querySelector('#path').value.trim()
    const image = form.querySelector('#image').files[0]

    const brand = {
        id,
        name,
        image,
        imagePath,
        keywords: keywords({ keys: [name] }),
        updatedAt: new Date(),
    }

    Form.submit({
        form,
        onProcess: async () => {
            const listArguments = searchParamsToListArguments({
                searchParams: (new URL(location.href)).searchParams,
            })

            const updateResult = await BrandHook.useUpdate({
                source: Source.FIREBASE,
                data: brand,
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