import { html } from 'saloe/html'

import Table from '@/shared/components/Table'

import * as PromotionHook from '@/shared/hooks/PromotionHook'
import { Source } from '@/shared/utils/constants'
import { getCMSCorrelative, lastUpdatedMessage } from '@/shared/utils/utils'
import { queryBySearchParams } from '@/shared/services/DatabaseService'


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
    const { data: promotions } = await queryBySearchParams({
        query: ({ listArguments }) => {
            return PromotionHook.useList({
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
                rows: promotions.map((promotion) => PromotionTableRow({
                    id: promotion.id,
                    name: `${promotion.name}`,
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