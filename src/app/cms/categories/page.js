import { html, stream } from 'saloe/html'

import CategoryWorkStation from '@/features/cms/features/Category/components/CategoryWorkStation'

import TopMenu from '@/shared/components/TopMenu'
import { COMPANY_NAME } from '@/shared/utils/constants'


const page = async ({ 
    request, 
    env, 
    cookies,
}) => {
    return stream({
        head: () =>html`
            <meta charset="UTF-8" />
            <link rel="icon" type="image/svg+xml" href="/vite.svg" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Saloe CMS</title>

            <link rel="stylesheet" href="/global.css">

            <link rel="stylesheet" href="/Button.css">
            <link rel="stylesheet" href="/Input.css">
            <link rel="stylesheet" href="/Form.css">
            <link rel="stylesheet" href="/Table.css">

            <link rel="stylesheet" href="/TopMenu.css">
            <link rel="stylesheet" href="/WorkStation.css">
        `,
        body: () => html`
            <main>
                ${
                    TopMenu({
                        companyName: COMPANY_NAME,
                    })
                }
                ${
                    CategoryWorkStation({
                        // categoryId: 'new',
                    })
                }
            </main>
        `,
        scripts: () => html``,
        env,
    })
}

export default page