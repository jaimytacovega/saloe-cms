import { html } from 'saloe/html'

import { delay } from '@/shared/utils/utils'


const removeError = ({ form }) => {
    const formError = form.querySelector('.form__error')
    if (formError) formError.remove()
}

const displayError = ({ form, err }) => {
    const inputgroup = form.querySelector('[type="submit"]')?.parentNode
    inputgroup.insertAdjacentHTML('afterbegin', html`
        <p class="form__error">${err}</p>
    `)
}

const submit = async ({
    form,
    onProcess,
    onError,
    onSuccess,
    timeout = 1_000,
}) => {
    try{
        form.setAttribute('submitting', true)
        removeError({ form })

        const promisesResult = await Promise.allSettled([
            onProcess(),
            delay({ ms: timeout }),
        ])

        const processResult = promisesResult.at(0)
        if (processResult.status === 'rejected') {
            const reason = promisesResult.at(0).reason
            throw reason.message ?? reason
        }
        
        if (onSuccess) await onSuccess({ result: processResult.value })
    }catch(err){
        console.error('err =', err)
        form.removeAttribute('submitting')
        displayError({ form, err })

        if (onError) await onError({ err })
    }
}

export {
    submit,
}