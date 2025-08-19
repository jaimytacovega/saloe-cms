import { html } from 'saloe/html'

import TopMenu from '@/shared/components/TopMenu'
import { COMPANY_NAME } from '@/shared/utils/constants'

import BrandWorkStation from '@/features/cms/features/Brand/components/BrandWorkStation'


const BrandPage = async ({
    brandId,
    searchParams,
} = { 
    brandId: null, 
    searchParams: null,
}) => {
    return html`
        <main>
            ${
                TopMenu({
                    companyName: COMPANY_NAME,
                })
            }
            ${
                await BrandWorkStation({     
                    brandId,
                    searchParams,
                })
            }
        </main>
    `
}

export default BrandPage