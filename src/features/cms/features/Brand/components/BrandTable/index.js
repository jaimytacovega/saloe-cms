import { html } from 'saloe/html'

import Table from '@/shared/components/Table'

import { Source } from '@/shared/utils/constants'
import { searchParamsToListArguments } from '@/shared/services/DatabaseService'
import { getCMSCorrelative, lastUpdatedMessage } from '@/shared/utils/utils'

import * as BrandHook from '@/shared/hooks/BrandHook'


const BrandTableRow = ({
    id,
    name,
    correlative,
    createdAt,
    updatedAt,
    toggled,
    searchParams,
    listUrl,
}) => {
    return html`
        <a href="${listUrl}/${id}?${searchParams?.toString()}" class="Row" ${toggled ? 'toggled' : ''}>
            <span>${name}</span>
            <span>${correlative}</span>
            <span>${lastUpdatedMessage({ date: updatedAt ?? createdAt })}</span>
        </a>
    `
}

const BrandTable = async ({
    brandId,
    searchParams,
    createUrl,
    listUrl,
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
                    correlative: getCMSCorrelative({ collectionName: 'brands', count: brand.count }),
                    createdAt: brand.createdAt,
                    updatedAt: brand.updatedAt,
                    toggled: brand.id === brandId,
                    searchParams,
                    listUrl,
                })),
                createUrl,
            })
        }
    `
}

export default BrandTable