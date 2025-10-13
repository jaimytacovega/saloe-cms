import { html } from 'saloe/html'

import QuotationFilterDropdown from '@/features/cms/features/Quotation/components/QuotationFilterDropdown'
import CmsSortDropdown from '@/features/cms/components/CmsSortDropdown'


const QuotationToolboxActions = async ({
    searchParams,
    createUrl,
}) => {
    return html`
        <inputgroup>
            ${
                await QuotationFilterDropdown({
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

export default QuotationToolboxActions