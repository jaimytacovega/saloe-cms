import { html } from 'saloe/html'

import Table from '@/shared/components/Table'

import { Source } from '@/shared/utils/constants'
import { queryBySearchParams } from '@/shared/services/DatabaseService'
import { getCMSCorrelative, lastUpdatedMessage } from '@/shared/utils/utils'
import { QUOTATION_TYPE_LABELS, QUOTATION_STATUS_LABELS } from '@/shared/repositories/QuotationRepository'

import * as QuotationHook from '@/shared/hooks/QuotationHook'


const QuotationTableRow = ({
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

const QuotationTable = async ({
    quotationId,
    searchParams,
    createUrl,
    listUrl,
}) => {
    // const listArguments = searchParamsToListArguments({ searchParams })
    // const { data: quotations } = await QuotationHook.useList({
    //     source: Source.FIREBASE,
    //     pageSize: 20,
    //     ...listArguments,
    //     ttl: 60_000,
    // })

    const { data: quotations } = await queryBySearchParams({
        query: ({ listArguments }) => {
            return QuotationHook.useList({
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
                rows: quotations.map((quotation) => QuotationTableRow({
                    id: quotation.id,
                    name: `RUC: ${quotation.client.code} - ${quotation.client.name}`,
                    correlative: `${getCMSCorrelative({ collectionName: 'quotations', count: quotation.count })}&nbsp;&nbsp;-&nbsp;&nbsp;Tipo: ${QUOTATION_TYPE_LABELS[quotation.type]}&nbsp;&nbsp;-&nbsp;&nbsp;Estado: ${QUOTATION_STATUS_LABELS[quotation.status]}`,
                    createdAt: quotation.createdAt,
                    updatedAt: quotation.updatedAt,
                    toggled: quotation.id === quotationId,
                    searchParams,
                    listUrl,
                })),
                createUrl,
            })
        }
    `
}

export default QuotationTable