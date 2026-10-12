import { html } from 'saloe/html'

import PromotionFilterDropdown from '@/features/cms/features/Promotion/components/PromotionFilterDropdown'
import CmsPaginationDropdown from '@/features/cms/components/CmsPaginationDropdown'
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

export default PromotionToolboxActions