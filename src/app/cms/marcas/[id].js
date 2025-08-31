import { html, stream } from 'saloe/html'
import { getScriptListener } from 'saloe/listener'

import BrandPage from '@/features/cms/features/Brand/components/BrandPage'
import { DEFAULT_PAGE_SIZE, DEFAULT_PAGE } from '@/shared/utils/constants'


const page = async ({ 
    request, 
    env, 
    cookies,
    urlPattern,
}) => {
    const url = new URL(request?.url)
    const match = urlPattern?.exec(url?.href)
    const brandId = match?.pathname?.groups?.id

    const searchParams = new URL(request.url).searchParams
    if (!searchParams.get('page') || !searchParams.get('pageSize')) {
        const redirectUrl = new URL(request.url)
        redirectUrl.searchParams.set('page', DEFAULT_PAGE)
        redirectUrl.searchParams.set('pageSize', DEFAULT_PAGE_SIZE)
        
        return { response: Response.redirect(redirectUrl.toString()) }
    }
    
    return stream({
        head: () => html`
            <meta charset="UTF-8" />
            <link rel="icon" type="image/svg+xml" href="/vite.svg" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Saloe CMS</title>

            <link rel="stylesheet" href="/global.css">

            <link rel="stylesheet" href="/Button.css">
            <link rel="stylesheet" href="/Input.css">
            <link rel="stylesheet" href="/Form.css">
            <link rel="stylesheet" href="/Table.css">
            <link rel="stylesheet" href="/Dialog.css">

            <link rel="stylesheet" href="/TopMenu.css">
            <link rel="stylesheet" href="/WorkStation.css">
        `,
        body: async () => html`
            ${
                await BrandPage({
                    brandId,
                    searchParams,
                })
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