import { html } from 'saloe/html'

import Dialog from '@/shared/components/Dialog'
import Input from '@/shared/components/Input'
import InputFile from '@/shared/components/InputFile'
import Select from '@/shared/components/Select'
import Textarea from '@/shared/components/Textarea'
import MultipleSelect from '@/shared/components/MultipleSelect'
import { CLIENT_TYPES, CLIENT_TYPE_LABELS } from '@/shared/repositories/QuotationRepository'
import { getCMSCorrelative } from '@/shared/utils/utils'


const HomeQuotationDialog = ({
    promotions,
}) => {
    const quotation = {}

    return Dialog({
        id: 'HomeQuotationDialog',
        className: 'HomeQuotationDialog',
        children: html`
            <form>
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
                                value: '',
                                placeholder: 'Ingresa el nombre completo o razón social',
                            })
                        }
                        ${
                            Input({
                                id: 'clientCode',
                                label: 'RUC',
                                value: '',
                                placeholder: 'Ingresa el RUC',
                            })
                        }
                        ${
                            Input({
                                id: 'clientEmail',
                                label: 'Correo electrónico',
                                value: '',
                                placeholder: 'Ingresa el correo electrónico',
                            })
                        }
                        ${
                            Input({
                                id: 'clientPhone',
                                label: 'Celular (con Whatsapp)',
                                value: '',
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
                                value: '',
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
                                value: '',
                                placeholder: 'Ingresa la solicitud de cotización',
                            })
                        }
                        ${
                            Input({
                                id: 'deliveryLocation',
                                label: 'Lugar de entrega',
                                value: '',
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
                    </fieldset>
                </div>
                <inputgroup>
                    <button class="Button PrimaryButton PrimaryGray">
                        <img src="/img/icon/corner-up-left-black.svg" width="18" height="18" alt="go back">
                    </button>
                    <hr/>
                    <button type="submit" class="Button PrimaryButton PrimaryBlue">Enviar</button>
                </inputgroup>
            </form>
        `
    })
}

export default HomeQuotationDialog