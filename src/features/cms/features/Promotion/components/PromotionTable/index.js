import { html } from 'saloe/html'

import Table from '@/shared/components/Table'

import * as PromotionHook from '@/shared/hooks/PromotionHook'
import { Source } from '@/shared/utils/constants'
import { Operators } from '@/shared/services/DatabaseService'
import { getCMSCorrelative, lastUpdatedMessage } from '@/shared/utils/utils'


const PromotionTableRow = ({
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

const PromotionTable = async ({
    promotionId,
    searchParams,
    createUrl,
    listUrl,
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

    const { data: promotions, isCached } = await PromotionHook.useList({
        source: Source.FIREBASE,
        pageSize: 20,
        filters,
        ttl: 10_000,
    })

    console.log({ promotions, isCached })

    return html`
        ${
            Table({
                rows: promotions.map((promotion) => PromotionTableRow({
                    id: promotion.id,
                    name: `${promotion.name} ~ ${isCached ? 'cached' : 'not cached'}`,
                    correlative: getCMSCorrelative({ collectionName: 'promotions', count: promotion.count }),
                    createdAt: promotion.createdAt,
                    updatedAt: promotion.updatedAt,
                    toggled: promotion.id === promotionId,
                    searchParams,
                    listUrl,
                })),
                createUrl,
            })
        }
    `
}

export default PromotionTable