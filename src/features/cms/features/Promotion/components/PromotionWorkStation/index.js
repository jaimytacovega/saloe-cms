import { html } from 'saloe/html'

import PromotionTable from '@/features/cms/features/Promotion/components/PromotionTable'
import PromotionAddOrUpdateForm from '@/features/cms/features/Promotion/components/PromotionAddOrUpdateForm'
import PromotionDeleteDialog from '@/features/cms/features/Promotion/components/PromotionDeleteDialog'

import WorkStation from '@/shared/components/WorkStation'

import CmsToolbox from '@/features/cms/components/CmsToolbox'


const PromotionWorkStation = async ({
    promotionId,
    searchParams,
}) => {
    return html`
        ${
            WorkStation({
                header: html`
                    <h1>Promociones</h1>
                `,
                toolbox: html`
                    ${
                        CmsToolbox({
                            id: promotionId,
                            searchParams,
                            createUrl: '/cms/promociones/crear',
                            listUrl: '/cms/promociones',
                            title: 'promociones',
                        })
                    }
                `,
                table: html`
                    ${
                        await PromotionTable({
                            searchParams,
                        })
                    }
                `,
                form: Boolean(promotionId)
                    ? html`
                        ${
                            await PromotionAddOrUpdateForm({
                                promotionId,
                            })
                        }
                        ${
                            await PromotionDeleteDialog({
                                promotionId,
                            })
                        }
                    ` 
                    : '',
            })
        }
    `
}

export default PromotionWorkStation