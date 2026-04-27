import * as BannerHook from '@/shared/hooks/BannerHook'

import { Source } from '@/shared/utils/constants'
import * as Form from '@/shared/components/Form'
import { keywords } from '@/shared/utils/utils'
import { searchParamsToListArguments } from '@/shared/services/DatabaseService'

import {
    encodeFileToWebp,
    DEFAULT_ENCODE_WEBP_OPTIONS,
} from '@/shared/lib/@saloe-webp'


const submit = ({
    e,
    srcElement: form,
}) => {
    e.preventDefault()

    const id = form.querySelector('#id').value.trim()
    const correlative = form.querySelector('#correlative').value.trim()
    const pretitle = form.querySelector('#pretitle').value.trim()
    const title = form.querySelector('#title').value.trim()
    const description = form.querySelector('#description').value.trim()
    const imagePath = form.querySelector('#imagePath').value.trim()
    const rawImage = form.querySelector('#image').files[0]
    const isPublished = Boolean(form.querySelector('#isPublished')?.checked)

    const keywordsPayload = keywords({
        keys: [
            correlative,
            pretitle,
            title,
        ].filter(Boolean),
    })
    const updatedAt = new Date()

    Form.submit({
        form,
        onProcess: async () => {
            const image = rawImage
                ? await encodeFileToWebp(rawImage, DEFAULT_ENCODE_WEBP_OPTIONS)
                : rawImage

            const banner = {
                id,
                pretitle,
                title,
                description,
                image,
                imagePath,
                isPublished,
                keywords: keywordsPayload,
                updatedAt,
            }

            const listArguments = searchParamsToListArguments({
                searchParams: (new URL(location.href)).searchParams,
            })

            const updateResult = await BannerHook.useUpdate({
                source: Source.FIREBASE,
                data: banner,
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
