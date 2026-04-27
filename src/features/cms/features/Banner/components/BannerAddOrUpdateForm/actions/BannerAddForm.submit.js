import * as BannerHook from '@/shared/hooks/BannerHook'

import * as Form from '@/shared/components/Form'
import { Source } from '@/shared/utils/constants'
import { keywords } from '@/shared/utils/utils'
import { searchParamsToListArguments } from '@/shared/services/DatabaseService'


const submit = ({
    e,
    srcElement: form,
}) => {
    e.preventDefault()

    const pretitle = form.querySelector('#pretitle').value.trim()
    const title = form.querySelector('#title').value.trim()
    const description = form.querySelector('#description').value.trim()
    const image = form.querySelector('#image').files[0]
    const isPublished = Boolean(form.querySelector('#isPublished')?.checked)
    const now = new Date()

    const banner = {
        pretitle,
        title,
        description,
        image,
        isPublished,
        createdAt: now,
        updatedAt: now,
    }

    Form.submit({
        form,
        onProcess: async () => {
            const listArguments = searchParamsToListArguments({
                searchParams: (new URL(location.href)).searchParams,
            })

            const addResult = await BannerHook.useAdd({
                source: Source.FIREBASE,
                data: banner,
                ...listArguments,
            })

            if (addResult?.err) throw addResult.err
            return addResult
        },
        onSuccess: ({ result }) => {
            location.href = `/cms/banners/${result.data.id}${location.search}`
        },
    })
}

export {
    submit,
}
