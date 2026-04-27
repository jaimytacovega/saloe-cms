import { html } from 'saloe/html'

import Table from '@/shared/components/Table'

import { Source } from '@/shared/utils/constants'
import { queryBySearchParams } from '@/shared/services/DatabaseService'
import { getCMSCorrelative, lastUpdatedMessage } from '@/shared/utils/utils'

import * as BannerHook from '@/shared/hooks/BannerHook'


const BannerTableRow = ({
    id,
    title,
    correlative,
    isPublished,
    createdAt,
    updatedAt,
    toggled,
    searchParams,
    listUrl,
}) => {
    return html`
        <a href="${listUrl}/${id}?${searchParams?.toString()}" class="Row" ${toggled ? 'toggled' : ''}>
            <span>${title}</span>
            <span>${correlative}</span>
            <span>${isPublished ? 'Publicado' : '—'}</span>
            <span>${lastUpdatedMessage({ date: updatedAt ?? createdAt })}</span>
        </a>
    `
}

const BannerTable = async ({
    bannerId,
    searchParams,
    createUrl,
    listUrl,
}) => {
    const { data: banners } = await queryBySearchParams({
        query: ({ listArguments }) => {
            return BannerHook.useList({
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
                rows: banners.map((banner) => BannerTableRow({
                    id: banner.id,
                    title: `${banner.title}`,
                    correlative: getCMSCorrelative({ collectionName: 'banners', count: banner.count }),
                    isPublished: banner.isPublished,
                    createdAt: banner.createdAt,
                    updatedAt: banner.updatedAt,
                    toggled: banner.id === bannerId,
                    searchParams,
                    listUrl,
                })),
                createUrl,
            })
        }
    `
}

export default BannerTable
