import { html } from 'saloe/html'

import { searchParamsToListArguments } from '@/shared/services/DatabaseService'

import Input from '@/shared/components/Input'
import Dropdown from '@/shared/components/Dropdown'


const CmsSortDropdown = ({
    searchParams,
}) => {
    const listArguments = searchParamsToListArguments({ searchParams })
    const sortersMap = (listArguments.sorters ?? []).reduce((acc, sorter) => {
        acc.set(`${sorter.field}:${sorter.direction}`, true)
        return acc
    }, new Map())

    const id = 'sort'

    return Dropdown({
        id,
        trigger: html`
            <button class="Button PrimaryButton PrimaryGray" type="button" popovertarget="${id}">Ordenar</button>
        `,
        content: html`
            <form on-submit="CmsSortDropdownForm.submit">
                <inputgroup>
                    <h6>Ordenar por</h6>
                </inputgroup>
                ${
                    Input({
                        id: 'updatedAt:desc',
                        label: 'Últimos modificados',
                        type: 'radio',
                        value: 'updatedAt:desc',
                        name: id,
                        checked: sortersMap.get('updatedAt:desc'),
                        reverse: true,
                    })
                }
                ${
                    Input({
                        id: 'updatedAt:asc',
                        label: 'Primeros modificados',
                        type: 'radio',
                        value: 'updatedAt:asc',
                        name: id,
                        checked: sortersMap.get('updatedAt:asc'),
                        reverse: true,
                    })
                }
                <inputgroup></inputgroup>
                <inputgroup>
                    <button 
                        class="Button PrimaryButton PrimaryBlack" 
                        type="submit"
                        
                        full-width
                        content-center
                    >Aplicar</button>
                </inputgroup>
            </form>
        `
    })
}

export default CmsSortDropdown