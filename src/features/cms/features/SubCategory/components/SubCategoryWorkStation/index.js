import { html } from 'saloe/html'

import SubCategoryTable from '@/features/cms/features/SubCategory/components/SubCategoryTable'
import SubCategoryAddOrUpdateForm from '@/features/cms/features/SubCategory/components/SubCategoryAddOrUpdateForm'
import SubCategoryDeleteDialog from '@/features/cms/features/SubCategory/components/SubCategoryDeleteDialog'

import WorkStation from '@/shared/components/WorkStation'

import CmsToolbox from '@/features/cms/components/CmsToolbox'


const SubCategoryWorkStation = async ({
    subCategoryId,
    searchParams,
}) => {
    return html`
        ${
            WorkStation({
                header: html`
                    <h1>Subcategorías</h1>
                `,
                toolbox: html`
                    ${
                        CmsToolbox({
                            id: subCategoryId,
                            searchParams,
                            createUrl: '/cms/subcategorias/crear',
                            listUrl: '/cms/subcategorias',
                            title: 'subcategorias',
                        })
                    }
                `,
                table: html`
                    ${
                        await SubCategoryTable({
                            searchParams,
                        })
                    }
                `,
                form: Boolean(subCategoryId)
                    ? html`
                        ${
                            await SubCategoryAddOrUpdateForm({
                                subCategoryId,
                            })
                        }
                        ${
                            await SubCategoryDeleteDialog({
                                subCategoryId,
                            })
                        }
                    ` 
                    : '',
            })
        }
    `
}

export default SubCategoryWorkStation