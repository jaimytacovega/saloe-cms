import { html } from 'saloe/html'

import Table from '@/shared/components/Table'

import { Source } from '@/shared/utils/constants'
import { searchParamsToListArguments } from '@/shared/services/DatabaseService'
import { getCMSCorrelative, lastUpdatedMessage } from '@/shared/utils/utils'

import * as SubCategoryHook from '@/shared/hooks/SubCategoryHook'


const SubCategoryTableRow = ({
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

const SubCategoryTable = async ({
    subCategoryId,
    searchParams,
    createUrl,
    listUrl,
}) => {
    const listArguments = searchParamsToListArguments({ searchParams })
    const { data: subCategories, isCached } = await SubCategoryHook.useList({
        source: Source.FIREBASE,
        pageSize: 20,
        ...listArguments,
        ttl: 60_000,
    })

    console.log('listArguments', listArguments)
    console.log('subCategories', subCategories)
    console.log('isCached', isCached)

    return html`
        ${
            Table({
                rows: subCategories.map((subCategory) => SubCategoryTableRow({
                    id: subCategory.id,
                    name: `${subCategory.name} ~ ${isCached ? 'cached' : 'not cached'}`,
                    correlative: getCMSCorrelative({ collectionName: 'subCategories', count: subCategory.count }),
                    createdAt: subCategory.createdAt,
                    updatedAt: subCategory.updatedAt,
                    toggled: subCategory.id === subCategoryId,
                    searchParams,
                    listUrl,
                })),
                createUrl,
            })
        }
    `
}

export default SubCategoryTable