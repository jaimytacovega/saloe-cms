import { html } from 'saloe/html'

import Table from '@/shared/components/Table'

import { Source } from '@/shared/utils/constants'
import { searchParamsToListArguments } from '@/shared/services/DatabaseService'
import { getCMSCorrelative, lastUpdatedMessage } from '@/shared/utils/utils'

import * as OrderHook from '@/shared/hooks/OrderHook'


const OrderTableRow = ({
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

const OrderTable = async ({
    orderId,
    searchParams,
    createUrl,
    listUrl,
}) => {
    const listArguments = searchParamsToListArguments({ searchParams })
    const { data: orders, isCached } = await OrderHook.useList({
        source: Source.FIREBASE,
        pageSize: 20,
        ...listArguments,
        ttl: 60_000,
    })

    console.log('orders', orders)
    console.log('isCached', isCached)

    return html`
        ${
            Table({
                rows: orders.map((order) => OrderTableRow({
                    id: order.id,
                    name: `${order.name}`,
                    correlative: getCMSCorrelative({ collectionName: 'orders', count: order.count }),
                    createdAt: order.createdAt,
                    updatedAt: order.updatedAt,
                    toggled: order.id === orderId,
                    searchParams,
                    listUrl,
                })),
                createUrl,
            })
        }
    `
}

export default OrderTable