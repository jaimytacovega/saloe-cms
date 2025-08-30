import { html } from 'saloe/html'

import TopMenu from '@/shared/components/TopMenu'
import { COMPANY_NAME } from '@/shared/utils/constants'

import SubCategoryWorkStation from '@/features/cms/features/SubCategory/components/SubCategoryWorkStation'


const SubCategoryPage = async ({
    subCategoryId,
    searchParams,
} = { 
    subCategoryId: null, 
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
                await SubCategoryWorkStation({     
                    subCategoryId,
                    searchParams,
                })
            }
        </main>
    `
}

export default SubCategoryPage