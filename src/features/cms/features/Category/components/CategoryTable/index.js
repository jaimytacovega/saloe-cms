import { html } from 'saloe/html'

import Table from '@/shared/components/Table'

import { Source } from '@/shared/utils/constants'
import { searchParamsToListArguments } from '@/shared/services/DatabaseService'
import { getCMSCorrelative, lastUpdatedMessage } from '@/shared/utils/utils'

import * as CategoryHook from '@/shared/hooks/CategoryHook'


const CategoryTableRow = ({
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

const CategoryTable = async ({
    categoryId,
    searchParams,
    createUrl,
    listUrl,
}) => {
    const listArguments = searchParamsToListArguments({ searchParams })
    const { data: categories, isCached } = await CategoryHook.useList({
        source: Source.FIREBASE,
        pageSize: 20,
        ...listArguments,
        ttl: 60_000,
    })

    console.log('categories', categories)
    console.log('isCached', isCached)

    return html`
        ${
            Table({
                rows: categories.map((category) => CategoryTableRow({
                    id: category.id,
                    name: `${category.name} ~ ${isCached ? 'cached' : 'not cached'}`,
                    correlative: getCMSCorrelative({ collectionName: 'categories', count: category.count }),
                    createdAt: category.createdAt,
                    updatedAt: category.updatedAt,
                    toggled: category.id === categoryId,
                    searchParams,
                    listUrl,
                })),
                createUrl,
            })
        }
    `
}

export default CategoryTable