import { html } from 'saloe/html'

import CmsPage from '@/features/cms/components/CmsPage'
import CmsToolbox from '@/features/cms/components/CmsToolbox'

import OrderTable from '@/features/cms/features/Order/components/OrderTable'
import OrderAddOrUpdateForm from '@/features/cms/features/Order/components/OrderAddOrUpdateForm'
import OrderDeleteDialog from '@/features/cms/features/Order/components/OrderDeleteDialog'
import NotFoundItem from '@/features/cms/components/NotFoundItem'


const OrderPage = async ({
    orderId,
    searchParams,
} = { 
    orderId: null, 
    searchParams: null,
}) => {
    const createUrl = '/cms/cotizaciones/crear'
    const listUrl = '/cms/cotizaciones'
    const title = 'cotizaciones'
    
    return html`
        ${
            await CmsPage({
                id: orderId,
                searchParams,
                header: html`
                    <h1>Cotizaciones</h1>
                `,
                toolbox: html`
                    ${
                        CmsToolbox({
                            id: orderId,
                            searchParams,
                            createUrl,
                            listUrl,
                            title,
                        })
                    }
                `,
                table: html`
                    ${
                        await OrderTable({
                            orderId,
                            searchParams,
                            createUrl,
                            listUrl,
                        })
                    }
                `,
                addOrUpdateForm: ({ id }) => {
                    return OrderAddOrUpdateForm({ 
                        orderId: id, 
                        listUrl,
                        searchParams, 
                    })
                },
                deleteDialog: ({ id }) => {
                    return OrderDeleteDialog({ orderId: id })
                },
                notFoundItem: NotFoundItem({
                    header: html`
                        <h5>Selecciona una marca para ver detalles</h5>
                    `,
                }),
            })
        }
    `
}

export default OrderPage