import { html } from 'saloe/html'

import Table from '@/shared/components/Table'

import { Source } from '@/shared/utils/constants'
import { Operators, searchParamsToListArguments } from '@/shared/services/DatabaseService'
import { lastUpdatedMessage } from '@/shared/utils/utils'

import * as BrandHook from '@/shared/hooks/BrandHook'


const BrandTableRow = ({
    id,
    name,
    createdAt,
    updatedAt,
    toggled,
    searchParams,
}) => {
    return html`
        <a href="/cms/marcas/${id}?${searchParams?.toString()}" class="Row" ${toggled ? 'toggled' : ''}>
            <span>${name}</span>
            <span>${lastUpdatedMessage({ date: updatedAt ?? createdAt })}</span>
        </a>
    `
}

const BrandTable = async ({
    brandId,
    searchParams,
}) => {
    const listArguments = searchParamsToListArguments({ searchParams })
    const { data: brands, isCached } = await BrandHook.useList({
        source: Source.FIREBASE,
        pageSize: 20,
        ...listArguments,
        ttl: 60_000,
    })

    console.log('brands', brands)
    console.log('isCached', isCached)

    return html`
        ${
            Table({
                rows: brands.map((brand) => BrandTableRow({
                    id: brand.id,
                    name: `${brand.name} ~ ${isCached ? 'cached' : 'not cached'}`,
                    createdAt: brand.createdAt,
                    updatedAt: brand.updatedAt,
                    toggled: brand.id === brandId,
                    searchParams,
                })),
                createUrl: '/cms/marcas/crear',
            })
        }
    `
}

export default BrandTable