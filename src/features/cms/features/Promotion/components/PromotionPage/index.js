import { html } from 'saloe/html'

import CmsPage from '@/features/cms/components/CmsPage'
import CmsToolbox from '@/features/cms/components/CmsToolbox'

import PromotionTable from '@/features/cms/features/Promotion/components/PromotionTable'
import PromotionAddOrUpdateForm from '@/features/cms/features/Promotion/components/PromotionAddOrUpdateForm'
import PromotionDeleteDialog from '@/features/cms/features/Promotion/components/PromotionDeleteDialog'
import NotFoundItem from '@/features/cms/components/NotFoundItem'
import PromotionToolboxActions from '@/features/cms/features/Promotion/components/PromotionToolboxActions'


const PromotionPage = async ({
    promotionId,
    searchParams,
    pathname,
} = { 
    promotionId: null, 
    searchParams: null,
}) => {
    const createUrl = '/cms/promociones/crear'
    const listUrl = '/cms/promociones'
    const title = 'promociones'
    
    return html`
        ${
            await CmsPage({
                id: promotionId,
                searchParams,
                header: html`
                    <h1>Promociones</h1>
                `,
                toolbox: html`
                    ${
                        CmsToolbox({
                            id: promotionId,
                            searchParams,
                            createUrl,
                            listUrl,
                            title,
                            actions: await PromotionToolboxActions({
                                searchParams,
                                createUrl,
                            })
                        })
                    }
                `,
                table: html`
                    ${
                        await PromotionTable({
                            promotionId,
                            searchParams,
                            createUrl,
                            listUrl,
                        })
                    }
                `,
                addOrUpdateForm: ({ id }) => {
                    return PromotionAddOrUpdateForm({ 
                        promotionId: id,
                        listUrl,
                        searchParams,
                    })
                },
                deleteDialog: ({ id }) => {
                    return PromotionDeleteDialog({ promotionId: id })
                },
                notFoundItem: NotFoundItem({
                    header: html`
                        <h5>Selecciona una promoción para ver detalles</h5>
                    `,
                }),
                pathname,
            })
        }
    `
}

export default PromotionPage