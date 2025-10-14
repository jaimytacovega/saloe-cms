import { html } from 'saloe/html'

import Table from '@/shared/components/Table'

import { Source } from '@/shared/utils/constants'
import { queryBySearchParams } from '@/shared/services/DatabaseService'
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
    const { data: brands } = await queryBySearchParams({
        query: ({ listArguments }) => {
            return BrandHook.useList({
                source: Source.FIREBASE,
                pageSize: 20,
                ...listArguments,
                ttl: 60_000,
            })
        },
        searchParams,
    })

    return html`
        ${
            Table({
                rows: brands.map((brand) => BrandTableRow({
                    id: brand.id,
                    name: `${brand.name}`,
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