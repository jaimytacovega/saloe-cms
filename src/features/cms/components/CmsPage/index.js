import { html } from 'saloe/html'

import TopMenu from '@/shared/components/TopMenu'
import { COMPANY_NAME } from '@/shared/utils/constants'

import CmsWorkStation from '@/features/cms/components/CmsWorkStation'
import CmsAsideNavigation from '@/features/cms/components/CmsAsideNavigation'


const CmsPage = async ({
    id,
    searchParams,
    pathname,
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
            ${
                CmsAsideNavigation({ 
                    pathname,
                })
            }
        </main>
    `
}

export default CmsPage