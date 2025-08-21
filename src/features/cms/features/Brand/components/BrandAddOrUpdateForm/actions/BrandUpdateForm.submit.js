import { Source } from '@/shared/utils/constants'
import * as Form from '@/shared/components/Form'
import { keywords } from '@/shared/utils/utils'

import * as BrandManager from '@/shared/managers/BrandManager'


const submit = ({
    e,
    srcElement: form,
}) => {
    e.preventDefault()

    const id = form.querySelector('#id').value.trim()
    const name = form.querySelector('#name').value.trim()
    const oldPath = form.querySelector('#path').value.trim()
    const image = form.querySelector('#image').files[0]

    const brand = {
        id,
        name,
        image,
        oldPath,
        keywords: keywords({ keys: [name] }),
        updatedAt: new Date(),
    }

    Form.submit({
        form,
        onProcess: async () => {
            const updateResult = await BrandManager.update({
                source: Source.FIREBASE,
                data: brand,
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