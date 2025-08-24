import { html } from 'saloe/html'

import Table from '@/shared/components/Table'

import * as BrandManager from '@/shared/managers/BrandManager'
import { Source } from '@/shared/utils/constants'
import { Operators } from '@/shared/services/DatabaseService'
import { lastUpdatedMessage } from '@/shared/utils/utils'

import * as BrandHook from '@/shared/hooks/BrandHook'


const BrandTableRow = ({
    id,
    name,
    createdAt,
    updatedAt,
    toggled,
}) => {
    return html`
        <a href="/cms/marcas/${id}" class="Row" ${toggled ? 'toggled' : ''}>
            <span>${name}</span>
            <span>${lastUpdatedMessage({ date: updatedAt ?? createdAt })}</span>
        </a>
    `
}

const BrandTable = async ({
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

    // const { data: brands } = await BrandManager.list({
    //     source: Source.FIREBASE,
    //     pageSize: 20,
    //     filters,
    // })

    const { data: brands, isCached } = await BrandHook.useList({
        source: Source.FIREBASE,
        pageSize: 20,
        filters,
        ttl: 60_000,
    })

    console.log('isCached', isCached)

    return html`
        ${
            Table({
                rows: brands.map((brand, idx) => BrandTableRow({
                    id: brand.id,
                    name: `${brand.name} ~ ${isCached ? 'cached' : 'not cached'}`,
                    createdAt: brand.createdAt,
                    updatedAt: brand.updatedAt,
                    toggled: idx === 0,
                })),
                createUrl: '/cms/marcas/crear',
            })
        }
    `
}

export default BrandTable