import { html, stream } from 'saloe/html'
import { getScriptListener } from 'saloe/listener'

import LoginMeta from '@/features/auth/LoginMeta'
import LoginPage from '@/features/auth/features/Login/LoginPage'

import * as AuthService from '@/shared/services/AuthService'


const page = async ({ 
    request, 
    env, 
    cookies,
}) => {
    const { response: redirectToCmsResponse } = AuthService.checkAndRedirectToCms({ request, cookies })
    if (redirectToCmsResponse) return { response: redirectToCmsResponse }

    const { response } = stream({
        head: () => html`
            ${
                LoginMeta()
            }
        `,
        body: async () => html`
            ${
                LoginPage()
            }
        `,
        scripts: () => html`
            ${
                getScriptListener({
                    listenAfterMs: 500,
                })
            }
        `,
        env,
    })

    const headers = new Headers(response.headers)
    headers.set('Cache-Control', 'no-store')

    return {
        response: new Response(response.body, {
            status: response.status,
            headers,
        }),
    }
}

export default page