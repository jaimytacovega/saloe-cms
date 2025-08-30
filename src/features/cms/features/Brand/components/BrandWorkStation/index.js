import { html } from 'saloe/html'

import BrandTable from '@/features/cms/features/Brand/components/BrandTable'
import BrandAddOrUpdateForm from '@/features/cms/features/Brand/components/BrandAddOrUpdateForm'
import BrandDeleteDialog from '@/features/cms/features/Brand/components/BrandDeleteDialog'

import WorkStation from '@/shared/components/WorkStation'
import NotFoundItem from '@/features/cms/components/NotFoundItem'

import CmsToolbox from '@/features/cms/components/CmsToolbox'


const BrandWorkStation = async ({
    brandId,
    searchParams,
}) => {
    return html`
        ${
            WorkStation({
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
                            searchParams,
                        })
                    }
                `,
                form: Boolean(brandId)
                    ? html`
                        ${
                            await BrandAddOrUpdateForm({
                                brandId,
                            })
                        }
                        ${
                            await BrandDeleteDialog({
                                brandId,
                            })
                        }
                    ` 
                    : html`
                        ${
                            NotFoundItem({
                                header: html`
                                    <h5>Selecciona una marca para ver detalles</h5>
                                `,
                            })
                        }   
                    `,
            })
        }
    `
}

export default BrandWorkStation