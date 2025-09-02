import { html, stream } from 'saloe/html'
import { getScriptListener } from 'saloe/listener'

import SubCategoryPage from '@/features/cms/features/SubCategory/components/SubCategoryPage'
import { redirectIfMissingSearchParams } from '@/features/cms/utils/utils'


const page = async ({ 
    request, 
    env, 
    cookies,
    urlPattern,
}) => {
    const url = new URL(request?.url)
    const match = urlPattern?.exec(url?.href)
    const subCategoryId = match?.pathname?.groups?.id

    const searchParams = new URL(request.url).searchParams
    const { response: redirectResponse } = redirectIfMissingSearchParams({ request, searchParams })
    if (redirectResponse) return { response: redirectResponse }
    
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
                await SubCategoryPage({
                    subCategoryId,
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