import { html } from 'saloe/html'

import ProductFilterDropdown from '@/features/cms/features/Product/components/ProductFilterDropdown'
import ProductSortDropdown from '@/features/cms/features/Product/components/ProductSortDropdown'


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
                ProductSortDropdown({
                    searchParams,
                })
            }
            <hr>
            <a href="${createUrl}?${searchParams?.toString()}" class="Button PrimaryButton PrimaryBlue">Crear</a>
        </inputgroup>
    `
}

export default ProductToolboxActions