import { html } from 'saloe/html'

import CmsPage from '@/features/cms/components/CmsPage'
import CmsToolbox from '@/features/cms/components/CmsToolbox'

import QuotationTable from '@/features/cms/features/Quotation/components/QuotationTable'
import QuotationAddOrUpdateForm from '@/features/cms/features/Quotation/components/QuotationAddOrUpdateForm'
import QuotationDeleteDialog from '@/features/cms/features/Quotation/components/QuotationDeleteDialog'
import NotFoundItem from '@/features/cms/components/NotFoundItem'


const QuotationPage = async ({
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
                        await QuotationTable({
                            orderId,
                            searchParams,
                            createUrl,
                            listUrl,
                        })
                    }
                `,
                addOrUpdateForm: ({ id }) => {
                    return QuotationAddOrUpdateForm({ 
                        orderId: id, 
                        listUrl,
                        searchParams, 
                    })
                },
                deleteDialog: ({ id }) => {
                    return QuotationDeleteDialog({ orderId: id })
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

export default QuotationPage