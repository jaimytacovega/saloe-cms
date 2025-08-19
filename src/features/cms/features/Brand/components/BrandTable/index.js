import { html } from 'saloe/html'

import Table from '@/shared/components/Table'

import * as BrandRepository from '@/shared/repositories/BrandRepository'
import { Source } from '@/shared/utils/constants'
import { Operators } from '@/shared/services/DatabaseService'
import { lastUpdatedMessage } from '@/shared/utils/utils'


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

    const { data: brands } = await BrandRepository.list({
        source: Source.FIREBASE,
        pageSize: 20,
        filters,
    })

    return html`
        ${
            Table({
                rows: brands.map((brand, idx) => BrandTableRow({
                    id: brand.id,
                    name: brand.name,
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