import { html } from 'saloe/html'

import Table from '@/shared/components/Table'

// import * as PromotionManager from '@/shared/managers/PromotionManager'
import * as PromotionHook from '@/shared/hooks/PromotionHook'
import { Source } from '@/shared/utils/constants'
import { Operators } from '@/shared/services/DatabaseService'
import { lastUpdatedMessage } from '@/shared/utils/utils'


const PromotionTableRow = ({
    id,
    name,
    createdAt,
    updatedAt,
    toggled,
}) => {
    return html`
        <a href="/cms/promociones/${id}" class="Row" ${toggled ? 'toggled' : ''}>
            <span>${name}</span>
            <span>${lastUpdatedMessage({ date: updatedAt ?? createdAt })}</span>
        </a>
    `
}

const PromotionTable = async ({
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

    // const { data: promotions } = await PromotionManager.list({
    //     source: Source.FIREBASE,
    //     pageSize: 20,
    //     filters,
    // })

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
                rows: promotions.map((promotion, idx) => PromotionTableRow({
                    id: promotion.id,
                    name: `${promotion.name} ~ ${isCached ? 'cached' : 'not cached'}`,
                    createdAt: promotion.createdAt,
                    updatedAt: promotion.updatedAt,
                    toggled: idx === 0,
                })),
                createUrl: '/cms/promociones/crear',
            })
        }
    `
}

export default PromotionTable