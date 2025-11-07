import { html } from 'saloe/html'

import CmsPage from '@/features/cms/components/CmsPage'
import CmsToolbox from '@/features/cms/components/CmsToolbox'

import ProductTable from '@/features/cms/features/Product/components/ProductTable'
import ProductAddOrUpdateForm from '@/features/cms/features/Product/components/ProductAddOrUpdateForm'
import ProductDeleteDialog from '@/features/cms/features/Product/components/ProductDeleteDialog'
import NotFoundItem from '@/features/cms/components/NotFoundItem'
import ProductToolboxActions from '@/features/cms/features/Product/components/ProductToolboxActions'


const ProductPage = async ({
    productId,
    searchParams,
    pathname,
} = { 
    productId: null, 
    searchParams: null,
}) => {
    const createUrl = '/cms/productos/crear'
    const listUrl = '/cms/productos'
    const title = 'productos'
    
    return html`
        ${
            await CmsPage({
                id: productId,
                searchParams,
                header: html`
                    <h1>Productos</h1>
                `,
                toolbox: html`
                    ${
                        CmsToolbox({
                            id: productId,
                            searchParams,
                            createUrl,
                            listUrl,
                            title,
                            actions: await ProductToolboxActions({
                                searchParams,
                                createUrl,
                            })
                        })
                    }
                `,
                table: html`
                    ${
                        await ProductTable({
                            productId,
                            searchParams,
                            createUrl,
                            listUrl,
                        })
                    }
                `,
                addOrUpdateForm: ({ id }) => {
                    return ProductAddOrUpdateForm({ 
                        productId: id,
                        listUrl,
                        searchParams,
                    })
                },
                deleteDialog: ({ id }) => {
                    return ProductDeleteDialog({ productId: id })
                },
                notFoundItem: NotFoundItem({
                    header: html`
                        <h5>Selecciona un producto para ver detalles</h5>
                    `,
                }),
                pathname,
            })
        }
    `
}

export default ProductPage