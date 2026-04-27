import { html } from 'saloe/html'

import CmsPage from '@/features/cms/components/CmsPage'
import CmsToolbox from '@/features/cms/components/CmsToolbox'

import BannerTable from '@/features/cms/features/Banner/components/BannerTable'
import BannerAddOrUpdateForm from '@/features/cms/features/Banner/components/BannerAddOrUpdateForm'
import BannerDeleteDialog from '@/features/cms/features/Banner/components/BannerDeleteDialog'
import NotFoundItem from '@/features/cms/components/NotFoundItem'
import BannerToolboxActions from '@/features/cms/features/Banner/components/BannerToolboxActions'


const BannerPage = async ({
    bannerId,
    searchParams,
    pathname,
} = {
    bannerId: null,
    searchParams: null,
}) => {
    const createUrl = '/cms/banners/crear'
    const listUrl = '/cms/banners'
    const title = 'banners'

    return html`
        ${
            await CmsPage({
                id: bannerId,
                searchParams,
                pathname,
                header: html`
                    <h1>Banners</h1>
                `,
                toolbox: html`
                    ${
                        CmsToolbox({
                            id: bannerId,
                            searchParams,
                            createUrl,
                            listUrl,
                            title,
                            actions: await BannerToolboxActions({
                                searchParams,
                                createUrl,
                            }),
                        })
                    }
                `,
                table: html`
                    ${
                        await BannerTable({
                            bannerId,
                            searchParams,
                            createUrl,
                            listUrl,
                        })
                    }
                `,
                addOrUpdateForm: ({ id }) => {
                    return BannerAddOrUpdateForm({
                        bannerId: id,
                        listUrl,
                        searchParams,
                    })
                },
                deleteDialog: ({ id }) => {
                    return BannerDeleteDialog({ bannerId: id })
                },
                notFoundItem: NotFoundItem({
                    header: html`
                        <h5>Selecciona un banner para ver detalles</h5>
                    `,
                }),
            })
        }
    `
}

export default BannerPage
