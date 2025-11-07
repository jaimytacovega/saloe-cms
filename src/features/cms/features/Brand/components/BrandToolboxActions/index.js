import { html } from 'saloe/html'

import CmsSortDropdown from '@/features/cms/components/CmsSortDropdown'


const BrandToolboxActions = async ({
    searchParams,
    createUrl,
}) => {
    return html`
        <inputgroup>
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

export default BrandToolboxActions