import * as PromotionManager from '@/shared/managers/PromotionManager'
import { Source } from '@/shared/utils/constants'
import * as Form from '@/shared/components/Form'


const submit = ({
    e,
    srcElement: form,
}) => {
    e.preventDefault()

    const id = form.querySelector('#id').value
    const path = form.querySelector('#path').value

    Form.submit({
        form,
        onProcess: async () => {
            const removeResult = await PromotionManager.remove({
                source: Source.FIREBASE,
                id,
                path,
            })

            if (removeResult.err) throw removeResult.err
            return removeResult
        },
        onSuccess: () => {
            location.href = '/cms/promociones'
        },
    })
}

export {
    submit,
}