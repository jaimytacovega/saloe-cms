import { html } from 'saloe/html'

import * as BrandHook from '@/shared/hooks/BrandHook'
import * as SubCategoryHook from '@/shared/hooks/SubCategoryHook'
import { Source } from '@/shared/utils/constants'
import { searchParamsToListArguments } from '@/shared/services/DatabaseService'

import Input from '@/shared/components/Input'
import Dropdown from '@/shared/components/Dropdown'


const ProductFilterDropdown = async ({
    searchParams,
}) => {
    // const filterParams = searchParams?.get('filter')?.split(',') ?? []
    // const brandIdsParam = filterParams.at(0)
    // const subCategoryIdsParam = filterParams.at(1)
    // console.log('filterParams =', filterParams)
    // console.log('brandIdsParam =', brandIdsParam)
    // console.log('subCategoryIdsParam =', subCategoryIdsParam)

    const listArguments = searchParamsToListArguments({ searchParams })
    const brandIdsMap = (listArguments.filters?.find((filter) => filter.field === 'brandIds')?.value ?? []).reduce((acc, brandId) => {
        acc.set(brandId, true)
        return acc
    }, new Map())

    const subCategoryIdsMap = (listArguments.filters?.find((filter) => filter.field === 'subCategoryIds')?.value ?? []).reduce((acc, subCategoryId) => {
        acc.set(subCategoryId, true)
        return acc
    }, new Map())

    console.log('brandIdsMap =', brandIdsMap)
    console.log('subCategoryIdsMap =', subCategoryIdsMap)

    const { data: brands } = await BrandHook.useList({
        source: Source.FIREBASE,
        ttl: 10_000,
    })

    const { data: subCategories } = await SubCategoryHook.useList({
        source: Source.FIREBASE,
        ttl: 10_000,
    })

    const id = 'filter'

    return Dropdown({
        id,
        trigger: html`
            <button class="Button PrimaryButton PrimaryGray" type="button" popovertarget="${id}">Filtrar</button>
        `,
        content: html`
            <form on-submit="ProductFilterDropdownForm.submit">
                <inputgroup>
                    <h6>Marcas</h6>
                </inputgroup>
                ${
                    brands.map((brand) => {
                        return html`
                            ${
                                Input({
                                    id: `brandIds-${brand.id}`,
                                    label: brand.name,
                                    type: 'checkbox',
                                    name: 'brandIds',
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
                    <h6>Subcategorías</h6>
                </inputgroup>
                <inputgroup>
                    ${
                        subCategories.map((subCategory) => {
                            return html`
                                ${
                                    Input({
                                        id: `subCategoryIds-${subCategory.id}`,
                                        label: subCategory.name,
                                        type: 'checkbox',
                                        name: 'subCategoryIds',
                                        value: subCategory.id,
                                        reverse: true,
                                        checked: Boolean(subCategoryIdsMap.get(subCategory.id)),
                                    })
                                }
                            `
                        }).join('')
                    }
                </inputgroup>
                <inputgroup></inputgroup>
                <inputgroup>
                    <button 
                        class="Button PrimaryButton PrimaryGray" 
                        type="button"

                        on-click="ProductFilterDropdownClearButton.click"
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

export default ProductFilterDropdown