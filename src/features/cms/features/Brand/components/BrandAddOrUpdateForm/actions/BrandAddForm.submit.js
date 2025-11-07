import * as BrandHook from '@/shared/hooks/BrandHook'

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
    const image = form.querySelector('#image').files[0]
    const now = new Date()

    const brand = {
        name,
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

            const addResult = await BrandHook.useAdd({
                source: Source.FIREBASE,
                data: brand,
                ...listArguments,
            })

            if (addResult?.err) throw addResult.err
            return addResult
        },
        onSuccess: ({ result }) => {    
            location.href = `/cms/marcas/${result.data.id}${location.search}`
        },
    })
}


export {
    submit,
}