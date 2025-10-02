import { html } from 'saloe/html'

import CmsPage from '@/features/cms/components/CmsPage'
import CmsToolbox from '@/features/cms/components/CmsToolbox'

import SubCategoryTable from '@/features/cms/features/SubCategory/components/SubCategoryTable'
import SubCategoryAddOrUpdateForm from '@/features/cms/features/SubCategory/components/SubCategoryAddOrUpdateForm'
import SubCategoryDeleteDialog from '@/features/cms/features/SubCategory/components/SubCategoryDeleteDialog'
import NotFoundItem from '@/features/cms/components/NotFoundItem'


const SubCategoryPage = async ({
    subCategoryId,
    searchParams,
} = { 
    subCategoryId: null, 
    searchParams: null,
}) => {
    const createUrl = '/cms/subcategorias/crear'
    const listUrl = '/cms/subcategorias'
    const title = 'subcategorias'
    
    return html`
        ${
            await CmsPage({
                id: subCategoryId,
                searchParams,
                header: html`
                    <h1>Subcategorías</h1>
                `,
                toolbox: html`
                    ${
                        CmsToolbox({
                            id: subCategoryId,
                            searchParams,
                            createUrl,
                            listUrl,
                            title,
                        })
                    }
                `,
                table: html`
                    ${
                        await SubCategoryTable({
                            subCategoryId,
                            searchParams,
                            createUrl,
                            listUrl,
                        })
                    }
                `,
                addOrUpdateForm: ({ id }) => {
                    return SubCategoryAddOrUpdateForm({ 
                        subCategoryId: id,
                        listUrl,
                        searchParams,
                    })
                },
                deleteDialog: ({ id }) => {
                    return SubCategoryDeleteDialog({ subCategoryId: id })
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

export default SubCategoryPage