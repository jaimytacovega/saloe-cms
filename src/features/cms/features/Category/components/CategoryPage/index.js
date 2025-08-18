import { html } from 'saloe/html'

import CategoryWorkStation from '@/features/cms/features/Category/components/CategoryWorkStation'

import TopMenu from '@/shared/components/TopMenu'
import { COMPANY_NAME } from '@/shared/utils/constants'


const CategoryPage = async ({
    categoryId,
    searchParams,
} = { 
    categoryId: null, 
    searchParams: null,
}) => {
    return html`
        <main>
            ${
                TopMenu({
                    companyName: COMPANY_NAME,
                })
            }
            ${
                await CategoryWorkStation({
                    categoryId,
                    searchParams,
                })
            }
        </main>
    `
}

export default CategoryPage