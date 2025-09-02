import { html } from 'saloe/html'

import CmsPage from '@/features/cms/components/CmsPage'
import CmsToolbox from '@/features/cms/components/CmsToolbox'

import BrandTable from '@/features/cms/features/Brand/components/BrandTable'
import BrandAddOrUpdateForm from '@/features/cms/features/Brand/components/BrandAddOrUpdateForm'
import BrandDeleteDialog from '@/features/cms/features/Brand/components/BrandDeleteDialog'
import NotFoundItem from '@/features/cms/components/NotFoundItem'


const BrandPage = async ({
    brandId,
    searchParams,
} = { 
    brandId: null, 
    searchParams: null,
}) => {
    return html`
        ${
            await CmsPage({
                id: brandId,
                searchParams,
                header: html`
                    <h1>Marcas</h1>
                `,
                toolbox: html`
                    ${
                        CmsToolbox({
                            id: brandId,
                            searchParams,
                            createUrl: '/cms/marcas/crear',
                            listUrl: '/cms/marcas',
                            title: 'marcas',
                        })
                    }
                `,
                table: html`
                    ${
                        await BrandTable({
                            brandId,
                            searchParams,
                        })
                    }
                `,
                addOrUpdateForm: ({ id }) => {
                    return BrandAddOrUpdateForm({ brandId: id })
                },
                deleteDialog: ({ id }) => {
                    return BrandDeleteDialog({ brandId: id })
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

export default BrandPage