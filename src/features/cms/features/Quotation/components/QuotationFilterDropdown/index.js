import { html } from 'saloe/html'

import * as BrandHook from '@/shared/hooks/BrandHook'
import * as SubCategoryHook from '@/shared/hooks/SubCategoryHook'
import { Source } from '@/shared/utils/constants'
import { searchParamsToListArguments } from '@/shared/services/DatabaseService'
import { QUOTATION_TYPES, QUOTATION_TYPE_LABELS, QUOTATION_STATUSES, QUOTATION_STATUS_LABELS, CLIENT_TYPES, CLIENT_TYPE_LABELS } from '@/shared/repositories/QuotationRepository'

import Input from '@/shared/components/Input'
import Dropdown from '@/shared/components/Dropdown'


const QuotationFilterDropdown = async ({
    searchParams,
}) => {
    const listArguments = searchParamsToListArguments({ searchParams })

    const typesMap = (listArguments.filters?.find((filter) => filter.field === 'type')?.value ?? []).reduce((acc, type) => {
        acc.set(type, true)
        return acc
    }, new Map())

    const statusesMap = (listArguments.filters?.find((filter) => filter.field === 'status')?.value ?? []).reduce((acc, status) => {
        acc.set(status, true)
        return acc
    }, new Map())

    const clientTypesMap = (listArguments.filters?.find((filter) => filter.field === 'clientType')?.value ?? []).reduce((acc, clientType) => {
        acc.set(clientType, true)
        return acc
    }, new Map())

    const [
        listQuotationTypesResult,
        listQuotationStatusesResult,
        listClientTypesResult,
    ] = await Promise.allSettled([
        { 
            data: Object.values(QUOTATION_TYPES).map((value) => ({
                value,
                label: QUOTATION_TYPE_LABELS[value],
            })),
        },
        {
            data: Object.values(QUOTATION_STATUSES).map((value) => ({
                value,
                label: QUOTATION_STATUS_LABELS[value],
            })),
        },
        {
            data: Object.values(CLIENT_TYPES).map((value) => ({
                value,
                label: CLIENT_TYPE_LABELS[value],
            })),
        },
    ])

    // TODO: Make error page
    if (
        listQuotationTypesResult.status === 'rejected' ||
        listQuotationStatusesResult.status === 'rejected' ||
        listClientTypesResult.status === 'rejected'
    ) return html`error`

    const { data: types } = listQuotationTypesResult.value
    const { data: statuses } = listQuotationStatusesResult.value
    const { data: clientTypes } = listClientTypesResult.value

    const id = 'filter'

    return Dropdown({
        id,
        trigger: html`
            <button class="Button PrimaryButton PrimaryGray" type="button" popovertarget="${id}">Filtrar</button>
        `,
        content: html`
            <form on-submit="QuotationFilterDropdownForm.submit">
                <inputgroup>
                    <h6>Tipos de cotización</h6>
                </inputgroup>
                ${
                    types.map((type) => {
                        return html`
                            ${
                                Input({
                                    id: `type-${type.value}`,
                                    label: type.label,
                                    type: 'checkbox',
                                    name: 'type',
                                    value: type.value,
                                    reverse: true,
                                    checked: Boolean(typesMap.get(type.value)),
                                })
                            }
                        `
                    }).join('')
                }
                <inputgroup></inputgroup>
                <inputgroup>
                    <h6>Tipos de cliente</h6>
                </inputgroup>
                ${
                    clientTypes.map((clientType) => {
                        return html`
                            ${
                                Input({
                                    id: `clientType-${clientType.value}`,
                                    label: clientType.label,
                                    type: 'checkbox',
                                    name: 'clientType',
                                    value: clientType.value,
                                    reverse: true,
                                    checked: Boolean(clientTypesMap.get(clientType.value)),
                                })
                            }
                        `
                    }).join('')
                }
                <inputgroup></inputgroup>
                <inputgroup>
                    <h6>Estados de cotización</h6>
                </inputgroup>
                ${
                    statuses.map((status) => {
                        return html`
                            ${
                                Input({
                                    id: `status-${status.value}`,
                                    label: status.label,
                                    type: 'checkbox',
                                    name: 'status',
                                    value: status.value,
                                    reverse: true,
                                    checked: Boolean(statusesMap.get(status.value)),
                                })
                            }
                        `
                    }).join('')
                }
                <inputgroup></inputgroup>
                <inputgroup>
                    <button 
                        class="Button PrimaryButton PrimaryGray" 
                        type="button"

                        on-click="CmsFilterDropdownClearButton.click"
                    >Limpiar</button>
                    <button 
                        class="Button PrimaryButton PrimaryBlack" 
                        type="submit"
                        
                        content-center
                    >Aplicar filtros</button>
                </inputgroup>
            </form>
        `
    })
}

export default QuotationFilterDropdown