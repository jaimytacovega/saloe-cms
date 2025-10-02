import { html } from 'saloe/html'

import Input from '@/shared/components/Input'
import InputFile from '@/shared/components/InputFile'
import MultipleSelect from '@/shared/components/MultipleSelect'
import Select from '@/shared/components/Select'

import NotFoundItem from '@/features/cms/components/NotFoundItem'

import * as OrderHook from '@/shared/hooks/OrderHook'
import * as PromotionHook from '@/shared/hooks/PromotionHook'
import { Source } from '@/shared/utils/constants'
import { lastUpdatedMessage, getCMSCorrelative } from '@/shared/utils/utils'
import { ORDER_TYPES, ORDER_TYPE_LABELS, ORDER_STATUSES, ORDER_STATUS_LABELS } from '@/shared/repositories/OrderRepository'


const OrderAddOrUpdateForm = async ({
    orderId,
    listUrl,
    searchParams,
}) => {
    const [
        orderGetResult, 
        promotionListResult,
    ] = await Promise.allSettled([
        orderId === 'new'
            ? { data: {}, isCached: false }
            : await OrderHook.useGet({
                source: Source.FIREBASE,
                id: orderId,
                ttl: 10_000,
            })
        ,
        PromotionHook.useList({
            source: Source.FIREBASE,
            ttl: 10_000,
        }),
    ])

    if (
        orderGetResult.status === 'rejected' || 
        promotionListResult.status === 'rejected'
    ) return html`error`

    const { data: order, isCached } = orderGetResult.value
    const { data: promotions } = promotionListResult.value

    console.log('order =', order)
    console.log('isCached =', isCached)

    return Boolean(order)
        ? html`
            <form on-submit="Order${orderId === 'new' ? 'Add' : 'Update'}Form.submit">
                <header>
                    <p>COTIZACIÓN</p>
                    <h2>
                        ${
                            orderId === 'new'
                                ? 'Nuevo cotización'
                                : `${getCMSCorrelative({ collectionName: 'orders', count: order.count })}`
                        }
                    </h2>
                </header>
                <div class="form__scroller">
                    <fieldset columns="1">
                        ${
                            Input({
                                id: 'id',
                                value: orderId,
                                type: 'hidden',
                            })
                        }
                        ${
                            Input({
                                id: 'clientName',
                                label: 'Nombre completo o Razón social',
                                value: order?.client?.name ?? '',
                                placeholder: 'Ingresa el nombre completo o razón social',
                            })
                        }
                        ${
                            Input({
                                id: 'clientCode',
                                label: 'RUC',
                                value: order?.client?.code ?? '',
                                placeholder: 'Ingresa el RUC',
                            })
                        }
                        ${
                            Input({
                                id: 'clientEmail',
                                label: 'Correo electrónico',
                                value: order?.client?.email ?? '',
                                placeholder: 'Ingresa el correo electrónico',
                            })
                        }
                        ${
                            Input({
                                id: 'clientPhone',
                                label: 'Celular (con Whatsapp)',
                                value: order?.client?.phone ?? '',
                                placeholder: 'Ingresa el celular',
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
                                files: (order?.attachments ?? []).map((order) => {
                                    const name = order.path.split('/').at(-1)
                                    return {
                                        ...order,
                                        name,
                                    }
                                }),
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
                                selectedOptions: (order?.promotionIds ?? []).reduce((acc, promotionId) => {
                                    acc[promotionId] = true
                                    return acc
                                }, {}),
                            })
                        }
                        ${
                            Select({
                                id: 'type',
                                label: 'Tipo de cotización',
                                options: Object.values(ORDER_TYPES).map((type) => ({
                                    value: type,
                                    label: ORDER_TYPE_LABELS[type],
                                })),
                                value: order?.type,
                            })
                        }
                        ${
                            Select({
                                id: 'status',
                                label: 'Estado',
                                options: Object.values(ORDER_STATUSES).map((status) => ({
                                    value: status,
                                    label: ORDER_STATUS_LABELS[status],
                                })),
                                value: order?.status,
                            })
                        }
                    </fieldset>
                </div>
                <inputgroup>
                    ${
                        orderId === 'new'
                            ? html`
                                <a href="${listUrl}?${searchParams?.toString()}" class="Button PrimaryButton PrimaryGray">
                                    <img src="/img/icon/corner-up-left-black.svg" width="18" height="18" alt="go back">
                                </a>
                            `
                            : html`
                                <button popovertarget="DeleteOrderDialog-${orderId}" type="button" class="Button PrimaryButton PrimaryGray">
                                    <img src="/img/icon/trash-black.svg" width="18" height="18" alt="trash">
                                </button>
                            `
                    }
                    <hr>
                    ${
                        orderId !== 'new'
                            ? html`
                                <small>${lastUpdatedMessage({ date: order.updatedAt ?? order.createdAt })}</small>
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

export default OrderAddOrUpdateForm