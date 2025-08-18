import { html } from 'saloe/html'

import CategoryToolbox from '@/features/cms/features/Category/components/CategoryToolbox'
import CategoryTable from '@/features/cms/features/Category/components/CategoryTable'
import CategoryForm from '@/features/cms/features/Category/components/CategoryForm'

import WorkStation from '@/shared/components/WorkStation'


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
                        CategoryToolbox({
                            categoryId,
                            searchParams,
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
                            await CategoryForm({
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