import { html } from 'saloe/html'

import ProductFilterDropdown from '@/features/cms/features/Product/components/ProductFilterDropdown'
import CmsPaginationDropdown from '@/features/cms/components/CmsPaginationDropdown'
import CmsSortDropdown from '@/features/cms/components/CmsSortDropdown'


const ProductToolboxActions = async ({
    searchParams,
    createUrl,
}) => {
    return html`
        <inputgroup>
            ${
                await ProductFilterDropdown({
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

export default ProductToolboxActions