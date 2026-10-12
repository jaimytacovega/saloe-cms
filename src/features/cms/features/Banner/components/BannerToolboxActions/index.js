import { html } from 'saloe/html'

import CmsPaginationDropdown from '@/features/cms/components/CmsPaginationDropdown'
import CmsSortDropdown from '@/features/cms/components/CmsSortDropdown'


const BannerToolboxActions = async ({
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
                })
            }
            <hr>
            <a href="${createUrl}?${searchParams?.toString()}" class="Button PrimaryButton PrimaryBlue">Crear</a>
        </inputgroup>
    `
}

export default BannerToolboxActions
