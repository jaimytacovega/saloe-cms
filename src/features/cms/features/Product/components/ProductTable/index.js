import { html } from 'saloe/html'

import Table from '@/shared/components/Table'

import { Source } from '@/shared/utils/constants'
import { searchParamsToListArguments } from '@/shared/services/DatabaseService'
import { getCMSCorrelative, lastUpdatedMessage } from '@/shared/utils/utils'

import * as ProductHook from '@/shared/hooks/ProductHook'


const ProductTableRow = ({
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

const ProductTable = async ({
    productId,
    searchParams,
    createUrl,
    listUrl,
}) => {
    const listArguments = searchParamsToListArguments({ searchParams })
    const { data: products, isCached } = await ProductHook.useList({
        source: Source.FIREBASE,
        pageSize: 20,
        ...listArguments,
        ttl: 60_000,
    })

    console.log('products', products)
    console.log('isCached', isCached)

    return html`
        ${
            Table({
                rows: products.map((product) => ProductTableRow({
                    id: product.id,
                    name: `${product.name} ~ ${isCached ? 'cached' : 'not cached'}`,
                    correlative: getCMSCorrelative({ collectionName: 'products', count: product.count }),
                    createdAt: product.createdAt,
                    updatedAt: product.updatedAt,
                    toggled: product.id === productId,
                    searchParams,
                    listUrl,
                })),
                createUrl,
            })
        }
    `
}

export default ProductTable