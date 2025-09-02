import { html } from 'saloe/html'

import TopMenu from '@/shared/components/TopMenu'
import { COMPANY_NAME } from '@/shared/utils/constants'

import CmsWorkStation from '@/features/cms/components/CmsWorkStation'


const CmsPage = async ({
    id,
    searchParams,
    header,
    toolbox,
    table,
    addOrUpdateForm,
    deleteDialog,
    notFoundItem,
}) => {
    return html`
        <main>
            ${
                TopMenu({
                    companyName: COMPANY_NAME,
                })
            }
            ${
                await CmsWorkStation({     
                    id,
                    searchParams,
                    header,
                    toolbox,
                    table,
                    addOrUpdateForm,
                    deleteDialog,
                    notFoundItem,
                })
            }
        </main>
    `
}

export default CmsPage