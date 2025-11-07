import { html } from 'saloe/html'

import CmsPage from '@/features/cms/components/CmsPage'
import CmsToolbox from '@/features/cms/components/CmsToolbox'

import QuotationTable from '@/features/cms/features/Quotation/components/QuotationTable'
import QuotationAddOrUpdateForm from '@/features/cms/features/Quotation/components/QuotationAddOrUpdateForm'
import QuotationDeleteDialog from '@/features/cms/features/Quotation/components/QuotationDeleteDialog'
import NotFoundItem from '@/features/cms/components/NotFoundItem'
import QuotationToolboxActions from '@/features/cms/features/Quotation/components/QuotationToolboxActions'


const QuotationPage = async ({
    quotationId,
    searchParams,
    pathname,
} = { 
    quotationId: null, 
    searchParams: null,
}) => {
    const createUrl = '/cms/cotizaciones/crear'
    const listUrl = '/cms/cotizaciones'
    const title = 'cotizaciones'
    
    return html`
        ${
            await CmsPage({
                id: quotationId,
                searchParams,
                header: html`
                    <h1>Cotizaciones</h1>
                `,
                toolbox: html`
                    ${
                        CmsToolbox({
                            id: quotationId,
                            searchParams,
                            createUrl,
                            listUrl,
                            title,
                            actions: await QuotationToolboxActions({
                                searchParams,
                                createUrl,
                            })
                        })
                    }
                `,
                table: html`
                    ${
                        await QuotationTable({
                            quotationId,
                            searchParams,
                            createUrl,
                            listUrl,
                        })
                    }
                `,
                addOrUpdateForm: ({ id }) => {
                    return QuotationAddOrUpdateForm({ 
                        quotationId: id, 
                        listUrl,
                        searchParams, 
                    })
                },
                deleteDialog: ({ id }) => {
                    return QuotationDeleteDialog({ quotationId: id })
                },
                notFoundItem: NotFoundItem({
                    header: html`
                        <h5>Selecciona una cotización para ver detalles</h5>
                    `,
                }),
                pathname,
            })
        }
    `
}

export default QuotationPage