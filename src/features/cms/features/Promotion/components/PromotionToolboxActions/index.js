import { html } from 'saloe/html'

import PromotionFilterDropdown from '@/features/cms/features/Promotion/components/PromotionFilterDropdown'
import CmsSortDropdown from '@/features/cms/components/CmsSortDropdown'


const PromotionToolboxActions = async ({
    searchParams,
    createUrl,
}) => {
    return html`
        <inputgroup>
            ${
                await PromotionFilterDropdown({
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

export default PromotionToolboxActions