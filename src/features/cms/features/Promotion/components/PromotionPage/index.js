import { html } from 'saloe/html'

import TopMenu from '@/shared/components/TopMenu'
import { COMPANY_NAME } from '@/shared/utils/constants'

import PromotionWorkStation from '@/features/cms/features/Promotion/components/PromotionWorkStation'


const PromotionPage = async ({
    promotionId,
    searchParams,
} = { 
    promotionId: null, 
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
                await PromotionWorkStation({     
                    promotionId,
                    searchParams,
                })
            }
        </main>
    `
}

export default PromotionPage