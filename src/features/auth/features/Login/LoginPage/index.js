import { html } from 'saloe/html'

import LoginForm from '@/features/auth/components/LoginForm'


const LoginPage = () => {
    return html`
        <main>
            ${
                LoginForm()
            }
        </main>
    `
}

export default LoginPage