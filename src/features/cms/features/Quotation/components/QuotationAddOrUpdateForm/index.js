import { html } from 'saloe/html'

import Input from '@/shared/components/Input'
import InputFile from '@/shared/components/InputFile'
import MultipleSelect from '@/shared/components/MultipleSelect'
import Select from '@/shared/components/Select'
import Textarea from '@/shared/components/Textarea'

import NotFoundItem from '@/features/cms/components/NotFoundItem'

import * as QuotationHook from '@/shared/hooks/QuotationHook'
import * as PromotionHook from '@/shared/hooks/PromotionHook'
import { Source } from '@/shared/utils/constants'
import { lastUpdatedMessage, getCMSCorrelative } from '@/shared/utils/utils'
import { QUOTATION_TYPES, QUOTATION_TYPE_LABELS, QUOTATION_STATUSES, QUOTATION_STATUS_LABELS, CLIENT_TYPES, CLIENT_TYPE_LABELS } from '@/shared/repositories/QuotationRepository'


const QuotationAddOrUpdateForm = async ({
    quotationId,
    listUrl,
    searchParams,
}) => {
    const [
        quotationGetResult, 
        promotionListResult,
    ] = await Promise.allSettled([
        quotationId === 'new'
            ? { data: {}, isCached: false }
            : await QuotationHook.useGet({
                source: Source.FIREBASE,
                id: quotationId,
                ttl: 10_000,
            })
        ,
        PromotionHook.useList({
            source: Source.FIREBASE,
            ttl: 10_000,
        }),
    ])

    if (
        quotationGetResult.status === 'rejected' || 
        promotionListResult.status === 'rejected'
    ) return html`error`

    const { data: quotation } = quotationGetResult.value
    const { data: promotions } = promotionListResult.value

    const correlative = getCMSCorrelative({ collectionName: 'quotations', count: quotation?.count ?? '' })

    return Boolean(quotation)
        ? html`
            <form on-submit="Quotation${quotationId === 'new' ? 'Add' : 'Update'}Form.submit">
                <header>
                    <h6>COTIZACIÓN</h6>
                    <h2>
                        ${
                            quotationId === 'new'
                                ? 'Nuevo cotización'
                                : correlative
                        }
                    </h2>
                </header>
                <div class="form__scroller">
                    <fieldset columns="1">
                        ${
                            quotationId === 'new'
                                ? ''
                                : Input({
                                    id: 'id',
                                    value: quotationId,
                                    type: 'hidden',
                                })
                        }
                        ${
                            quotationId === 'new'
                                ? ''
                                : Input({
                                    id: 'correlative',
                                    value: correlative,
                                    type: 'hidden',
                                })
                        }
                        ${
                            Input({
                                id: 'clientName',
                                label: 'Nombre completo o Razón social',
                                value: quotation?.client?.name ?? '',
                                placeholder: 'Ingresa el nombre completo o razón social',
                            })
                        }
                        ${
                            Input({
                                id: 'clientCode',
                                label: 'RUC',
                                value: quotation?.client?.code ?? '',
                                placeholder: 'Ingresa el RUC',
                            })
                        }
                        ${
                            Input({
                                id: 'clientEmail',
                                label: 'Correo electrónico',
                                value: quotation?.client?.email ?? '',
                                placeholder: 'Ingresa el correo electrónico',
                            })
                        }
                        ${
                            Input({
                                id: 'clientPhone',
                                label: 'Celular (con Whatsapp)',
                                value: quotation?.client?.phone ?? '',
                                placeholder: 'Ingresa el celular',
                            })
                        }
                        ${
                            Select({
                                id: 'clientType',
                                label: 'Tipo de cliente',
                                options: Object.values(CLIENT_TYPES).map((type) => ({
                                    value: type,
                                    label: CLIENT_TYPE_LABELS[type],
                                })),
                                value: quotation?.client?.type,
                            })
                        }
                        ${
                            InputFile({
                                id: 'attachments',
                                label: 'Pedido adjunto (opcional)',
                                type: 'file',
                                accept: 'application/pdf',
                                acceptLabel: 'PDF',
                                multiple: true,
                                files: (quotation?.attachments ?? []).map((quotation) => {
                                    const name = quotation.path.split('/').at(-1)
                                    return {
                                        ...quotation,
                                        name,
                                    }
                                }),
                            })
                        }
                        ${
                            Textarea({
                                id: 'request',
                                label: 'Solicitud de cotización (opcional)',
                                value: quotation?.request ?? '',
                                placeholder: 'Ingresa la solicitud de cotización',
                            })
                        }
                        ${
                            Input({
                                id: 'deliveryLocation',
                                label: 'Lugar de entrega',
                                value: quotation?.deliveryLocation ?? '',
                                placeholder: 'Ingresa el lugar de entrega',
                            })
                        }
                        ${
                            MultipleSelect({
                                id: 'promotionIds',
                                label: 'Promociones',
                                options: (promotions ?? []).map((promotion) => ({
                                    value: promotion.id,
                                    label: `${getCMSCorrelative({ collectionName: 'promotions', count: promotion.count })}: ${promotion.name}`,
                                })),
                                selectedOptions: (quotation?.promotionIds ?? []).reduce((acc, promotionId) => {
                                    acc[promotionId] = true
                                    return acc
                                }, {}),
                            })
                        }
                        ${
                            Select({
                                id: 'type',
                                label: 'Tipo de cotización',
                                options: Object.values(QUOTATION_TYPES).map((type) => ({
                                    value: type,
                                    label: QUOTATION_TYPE_LABELS[type],
                                })),
                                value: quotation?.type,
                            })
                        }
                        ${
                            Select({
                                id: 'status',
                                label: 'Estado',
                                options: Object.values(QUOTATION_STATUSES).map((status) => ({
                                    value: status,
                                    label: QUOTATION_STATUS_LABELS[status],
                                })),
                                value: quotation?.status,
                            })
                        }
                    </fieldset>
                </div>
                <inputgroup>
                    <a href="${listUrl}?${searchParams?.toString()}" class="Button PrimaryButton PrimaryGray">
                        <img src="/img/icon/corner-up-left-black.svg" width="18" height="18" alt="go back">
                    </a>
                    ${
                        quotationId === 'new'
                            ? ''
                            : html`
                                <button popovertarget="DeleteQuotationDialog-${quotationId}" type="button" class="Button PrimaryButton PrimaryGray">
                                    <img src="/img/icon/trash-black.svg" width="18" height="18" alt="trash">
                                </button>
                            `
                    }
                    <hr>
                    ${
                        quotationId !== 'new'
                            ? html`
                                <small>${lastUpdatedMessage({ date: quotation.updatedAt ?? quotation.createdAt })}</small>
                            `
                            : ''
                    }
                    <button class="Button PrimaryButton PrimaryBlue" type="submit">Guardar</button>
                </inputgroup>
            </form>
        `
        : NotFoundItem({
            header: html`
                <h5>Aun no se registran datos</h5>
                <p>Crea nuevos registros y gestionalos desde esta sección</p>
            `,
            createUrl: '/cms/cotizaciones',
        })
}

export default QuotationAddOrUpdateForm