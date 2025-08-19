import { html } from 'saloe/html'

import CategoryTable from '@/features/cms/features/Category/components/CategoryTable'
import CategoryAddOrUpdateForm from '@/features/cms/features/Category/components/CategoryAddOrUpdateForm'
import CategoryDeleteDialog from '@/features/cms/features/Category/components/CategoryDeleteDialog'

import WorkStation from '@/shared/components/WorkStation'

import CmsToolbox from '@/features/cms/components/CmsToolbox'

const CategoryWorkStation = async ({
    categoryId,
    searchParams,
}) => {
    return html`
        ${
            WorkStation({
                header: html`
                    <h1>Categorías</h1>
                `,
                toolbox: html`
                    ${
                        CmsToolbox({
                            id: categoryId,
                            searchParams,
                            createUrl: '/cms/categorias/crear',
                            listUrl: '/cms/categorias',
                            title: 'categorías',
                        })
                    }
                `,
                table: html`
                    ${
                        await CategoryTable({
                            searchParams,
                        })
                    }
                `,
                form: Boolean(categoryId)
                    ? html`
                        ${
                            await CategoryAddOrUpdateForm({
                                categoryId,
                            })
                        }
                        ${
                            await CategoryDeleteDialog({
                                categoryId,
                            })
                        }
                    ` 
                    : '',
            })
        }
    `
}

export default CategoryWorkStation