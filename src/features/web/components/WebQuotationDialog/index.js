import { html } from 'saloe/html'

import Dialog from '@/shared/components/Dialog'
import Input from '@/shared/components/Input'
import InputFile from '@/shared/components/InputFile'
import Select from '@/shared/components/Select'
import Textarea from '@/shared/components/Textarea'
import MultipleSelect from '@/shared/components/MultipleSelect'
import { get as getQuotation } from '@/features/web/components/WebQuotation'
import { update as updateMultipleSelect } from '@/shared/components/MultipleSelect'

import { CLIENT_TYPES, CLIENT_TYPE_LABELS } from '@/shared/repositories/QuotationRepository'
import { getCMSCorrelative } from '@/shared/utils/utils'

import * as WebHook from '@/features/web/hooks/WebHook'


const update = async () => {
    const quotation = getQuotation()
    const form = document?.getElementById('WebQuotationDialog')?.querySelector('form')

    console.log('quotation =', quotation)

    form.querySelector('#clientName').value = quotation.client.name ?? ''
    form.querySelector('#clientCode').value = quotation.client.code ?? ''
    form.querySelector('#clientEmail').value = quotation.client.email ?? ''
    form.querySelector('#clientPhone').value = quotation.client.phone ?? ''
    form.querySelector('#clientType').value = quotation.client.type ?? ''
    form.querySelector('#request').value = quotation.request ?? ''
    form.querySelector('#deliveryLocation').value = quotation.deliveryLocation ?? ''

    updateMultipleSelect({
        id: 'promotionIds',
        selectedOptions: quotation.promotionIds ?? [],
    })
}

const WebQuotationDialog = async ({
    client = {
        name: '',
        code: '',
        email: '',
        phone: '',
        type: CLIENT_TYPES.OTHER,
    },
    request = '',
    deliveryLocation = '',
    promotionIds = [],
} = {}) => {
    const { data: categories } = await WebHook.useListCategories({ ttl: 10_000 })
    const { data: brands } = await WebHook.useListBrandsByCategories({ categories, ttl: 10_000 })
    const { data: promotions } = await WebHook.useListPromotionsByBrands({ brands, ttl: 10_000 })

    return Dialog({
        id: 'WebQuotationDialog',
        className: 'WebQuotationDialog',
        children: html`
            <form on-change="WebQuotationDialogForm.change">
                <header>
                    <h2>Quieres que coticemos tu obra?</h2>
                    <p>Indicanos tus datos para poder enviarte una cotización.</p>
                </header>
                <div class="form__scroller">
                    <fieldset columns="1">
                        ${
                            Input({
                                id: 'clientName',
                                label: 'Nombre completo o Razón social',
                                value: client?.name ?? '',
                                placeholder: 'Ingresa el nombre completo o razón social',
                                data: html`data-field="clientName" on-change="WebQuotationInput.change"`,
                            })
                        }
                        ${
                            Input({
                                id: 'clientCode',
                                label: 'RUC',
                                value: client?.code ?? '',
                                placeholder: 'Ingresa el RUC',
                                data: html`data-field="clientCode" on-change="WebQuotationInput.change"`,
                            })
                        }
                        ${
                            Input({
                                id: 'clientEmail',
                                label: 'Correo electrónico',
                                value: client?.email ?? '',
                                placeholder: 'Ingresa el correo electrónico',
                                data: html`data-field="clientEmail" on-change="WebQuotationInput.change"`,
                            })
                        }
                        ${
                            Input({
                                id: 'clientPhone',
                                label: 'Celular (con Whatsapp)',
                                value: client?.phone ?? '',
                                placeholder: 'Ingresa el celular',
                                data: html`data-field="clientPhone" on-change="WebQuotationInput.change"`,
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
                                value: client?.type ?? '',
                                data: html`data-field="clientType" on-change="WebQuotationInput.change"`,
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
                                files: [],
                            })
                        }
                        ${
                            Textarea({
                                id: 'request',
                                label: 'Solicitud de cotización (opcional)',
                                value: request ?? '',
                                placeholder: 'Ingresa la solicitud de cotización',
                                data: html`data-field="request" on-change="WebQuotationInput.change"`,
                            })
                        }
                        ${
                            Input({
                                id: 'deliveryLocation',
                                label: 'Lugar de entrega',
                                value: deliveryLocation ?? '',
                                placeholder: 'Ingresa el lugar de entrega',
                                data: html`data-field="deliveryLocation" on-change="WebQuotationInput.change"`,
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
                                selectedOptions: (promotionIds ?? []).reduce((acc, promotionId) => {
                                    acc[promotionId] = true
                                    return acc
                                }, {}),
                                data: html`data-field="promotionIds" on-change="WebQuotationInput.change"`,
                            })
                        }
                    </fieldset>
                </div>
                <inputgroup>
                    <button
                        type="button"
                        class="Button PrimaryButton PrimaryGray"
                        onclick="this.closest('dialog')?.hidePopover()"
                    >
                        <img src="/img/icon/corner-up-left-black.svg" width="18" height="18" alt="">
                    </button>
                    <hr/>
                    <button type="submit" class="Button PrimaryButton PrimaryBlue">Enviar</button>
                </inputgroup>
            </form>
        `
    })
}

export default WebQuotationDialog

export {
    update,
}