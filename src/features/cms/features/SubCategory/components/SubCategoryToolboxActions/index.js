import { html } from 'saloe/html'

import CmsSortDropdown from '@/features/cms/components/CmsSortDropdown'


const SubCategoryToolboxActions = async ({
    searchParams,
    createUrl,
}) => {
    return html`
        <inputgroup>
            ${
                CmsSortDropdown({
                    searchParams,
                })
            }
            <hr>
            <a href="${createUrl}?${searchParams?.toString()}" class="Button PrimaryButton PrimaryBlue">Crear</a>
        </inputgroup>
    `
}

export default SubCategoryToolboxActions