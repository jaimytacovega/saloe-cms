import { html } from 'saloe/html'

import * as BrandHook from '@/shared/hooks/BrandHook'
import { Source } from '@/shared/utils/constants'
import { searchParamsToListArguments } from '@/shared/services/DatabaseService'

import Input from '@/shared/components/Input'
import Dropdown from '@/shared/components/Dropdown'


const PromotionFilterDropdown = async ({
    searchParams,
}) => {
    const listArguments = searchParamsToListArguments({ searchParams })
    const brandIdsMap = (listArguments.filters?.find((filter) => filter.field === 'brandId')?.value ?? []).reduce((acc, brandId) => {
        acc.set(brandId, true)
        return acc
    }, new Map())

    const [
        listBrandsResult,
    ] = await Promise.allSettled([
        BrandHook.useList({
            source: Source.FIREBASE,
            ttl: 10_000,
        }),
    ])

    // TODO: Make error page
    if (
        listBrandsResult.status === 'rejected'
    ) return html`error`

    const { data: brands } = listBrandsResult.value

    const id = 'filter'

    return Dropdown({
        id,
        trigger: html`
            <button class="Button PrimaryButton PrimaryGray" type="button" popovertarget="${id}">Filtrar</button>
        `,
        content: html`
            <form on-submit="PromotionFilterDropdownForm.submit">
                <inputgroup>
                    <h6>Marcas</h6>
                </inputgroup>
                ${
                    brands.map((brand) => {
                        return html`
                            ${
                                Input({
                                    id: `brandId-${brand.id}`,
                                    label: brand.name,
                                    type: 'checkbox',
                                    name: 'brandId',
                                    value: brand.id,
                                    reverse: true,
                                    checked: Boolean(brandIdsMap.get(brand.id)),
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

export default PromotionFilterDropdown