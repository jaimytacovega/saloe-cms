import { html, stream } from 'saloe/html'
import { getScriptListener } from 'saloe/listener'

import LoginMeta from '@/features/auth/LoginMeta'
import LoginPage from '@/features/auth/features/Login/LoginPage'


const page = async ({ 
    request, 
    env, 
    cookies,
}) => {
    return stream({
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
}

export default page