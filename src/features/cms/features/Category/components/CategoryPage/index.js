import { html } from 'saloe/html'

import CmsPage from '@/features/cms/components/CmsPage'
import CmsToolbox from '@/features/cms/components/CmsToolbox'

import CategoryTable from '@/features/cms/features/Category/components/CategoryTable'
import CategoryAddOrUpdateForm from '@/features/cms/features/Category/components/CategoryAddOrUpdateForm'
import CategoryDeleteDialog from '@/features/cms/features/Category/components/CategoryDeleteDialog'
import NotFoundItem from '@/features/cms/components/NotFoundItem'
import CategoryToolboxActions from '@/features/cms/features/Category/components/CategoryToolboxActions'


const CategoryPage = async ({
    categoryId,
    searchParams,
} = { 
    categoryId: null, 
    searchParams: null,
}) => {
    const createUrl = '/cms/categorias/crear'
    const listUrl = '/cms/categorias'
    const title = 'categorías'
    
    return html`
        ${
            await CmsPage({
                id: categoryId,
                searchParams,
                header: html`
                    <h1>Categorías</h1>
                `,
                toolbox: html`
                    ${
                        CmsToolbox({
                            id: categoryId,
                            searchParams,
                            createUrl,
                            listUrl,
                            title,
                            actions: await CategoryToolboxActions({
                                searchParams,
                                createUrl,
                            })
                        })
                    }
                `,
                table: html`
                    ${
                        await CategoryTable({
                            categoryId,
                            searchParams,
                            createUrl,
                            listUrl,
                        })
                    }
                `,
                addOrUpdateForm: ({ id }) => {
                    return CategoryAddOrUpdateForm({ 
                        categoryId: id,
                        listUrl,
                        searchParams,
                    })
                },
                deleteDialog: ({ id }) => {
                    return CategoryDeleteDialog({ categoryId: id })
                },
                notFoundItem: NotFoundItem({
                    header: html`
                        <h5>Selecciona una categoría para ver detalles</h5>
                    `,
                }),
            })
        }
    `
}

export default CategoryPage