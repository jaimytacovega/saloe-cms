import { html } from 'saloe/html'

import Table from '@/shared/components/Table'

import { Source } from '@/shared/utils/constants'
import { Operators } from '@/shared/services/DatabaseService'
import { lastUpdatedMessage } from '@/shared/utils/utils'

import * as SubCategoryHook from '@/shared/hooks/SubCategoryHook'


const SubCategoryTableRow = ({
    id,
    name,
    createdAt,
    updatedAt,
    toggled,
}) => {
    return html`
        <a href="/cms/subcategorias/${id}" class="Row" ${toggled ? 'toggled' : ''}>
            <span>${name}</span>
            <span>${lastUpdatedMessage({ date: updatedAt ?? createdAt })}</span>
        </a>
    `
}

const SubCategoryTable = async ({
    searchParams,
}) => {
    const search = searchParams?.get('search')
    const filters = search
        ? [
            {
                field: 'keywords',
                operator: Operators.Contains,
                value: search,
            }
        ]
        : []

    // const { data: subcategories } = await SubCategoryManager.list({
    //     source: Source.FIREBASE,
    //     pageSize: 20,
    //     filters,
    // })

    const { data: subcategories, isCached } = await SubCategoryHook.useList({
        source: Source.FIREBASE,
        pageSize: 20,
        filters,
        ttl: 60_000,
    })

    console.log('isCached', isCached)

    return html`
        ${
            Table({
                rows: subcategories.map((brand, idx) => SubCategoryTableRow({
                    id: brand.id,
                    name: `${brand.name} ~ ${isCached ? 'cached' : 'not cached'}`,
                    createdAt: brand.createdAt,
                    updatedAt: brand.updatedAt,
                    toggled: idx === 0,
                })),
                createUrl: '/cms/subcategorias/crear',
            })
        }
    `
}

export default SubCategoryTable