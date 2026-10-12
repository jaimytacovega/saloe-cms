import { html } from 'saloe/html'

import CmsPaginationDropdown from '@/features/cms/components/CmsPaginationDropdown'
import CmsSortDropdown from '@/features/cms/components/CmsSortDropdown'


const SubCategoryToolboxActions = async ({
    searchParams,
    createUrl,
}) => {
    return html`
        <inputgroup>
            ${
                CmsPaginationDropdown({
                    searchParams,
                })
            }
            ${
                CmsSortDropdown({
                    searchParams,
                    includeSortByName: true,
                })
            }
            <hr>
            <a href="${createUrl}?${searchParams?.toString()}" class="Button PrimaryButton PrimaryBlue">Crear</a>
        </inputgroup>
    `
}

export default SubCategoryToolboxActions