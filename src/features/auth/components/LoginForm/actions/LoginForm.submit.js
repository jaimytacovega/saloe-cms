import * as AuthManager from '@/shared/managers/AuthManager'

import { Source } from '@/shared/utils/constants'
import * as Form from '@/shared/components/Form'


const submit = ({
    e,
    srcElement: form,
}) => {
    e.preventDefault()

    const email = form.querySelector('input[name="email"]').value.trim()
    const password = form.querySelector('input[password]').value.trim()

    Form.submit({
        form,
        onProcess: async () => {
            const signInWithEmailAndPasswordResult = await AuthManager.signInWithEmailAndPassword({
                source: Source.FIREBASE,
                email,
                password,
            })

            if (signInWithEmailAndPasswordResult?.err) throw signInWithEmailAndPasswordResult.err

            AuthManager.setCredentialsInCookies({
                credentials: signInWithEmailAndPasswordResult.data.credentials,
            })
        },
        onSuccess: ({ result }) => {
            location.href = '/cms/marcas'
        },
    })
}

export {
    submit,
}