import { html } from 'saloe/html'

import MultipleSelectOption from '@/shared/components/MultipleSelectOption'


const set = ({
    id,
    selectedOption,
}) => {
    const selector = document?.getElementById(`${id}__selector`)

    for (const option of (selector?.options ?? [])){
        if (option.value === selectedOption){
            option.selected = true
            const event = new Event('change', { bubbles: true })
            selector.dispatchEvent(event)
        }
    }
}

const unset = ({
    id, 
    selectedOption,
}) => {
    const removeButton = document?.getElementById(`${id}__selector`)?.querySelector(`#${id}__options button#${id}-option-${selectedOption}`)
    removeButton?.click()
}

const update = ({
    id, 
    selectedOptions,
}) => {
    const settedOptions = document.getElementById(id)?.selectedOptions ?? []
    const optionsToUnselect = [...settedOptions].filter((option) => !selectedOptions[option.value])

    optionsToUnselect.forEach((option) => {
        unset({
            id,
            selectedOption: option.value,
        })
    })

    selectedOptions.forEach((option) => {
        set({
            id,
            selectedOption: option,
        })
    })
}

const MultipleSelect = ({
    id,
    label,
    options = [],
    selectedOptions = {},
    placeholder = 'Selecciona una o más opciones',
    data = '',
}) => {
    return html`
        <inputgroup>
            <label for="${id}__selector">${label}</label>
            <select id="${id}" multiple on-change="MultipleSelect.change">
                <optgroup label="${placeholder}">
                    ${
                        options.map((option) => html`
                            <option 
                                value="${option.value}"
                                ${selectedOptions[option.value] ? 'selected' : ''}
                            >${option.label}</option>
                        `).join('')
                    }
                </optgroup>
            </select>
            <select id="${id}__selector" on-change="MultipleSelectSelector.change">
                <option disabled selected>${placeholder}</option>
                ${
                    options.map((option) => html`
                        <option value="${option.value}">${option.label}</option>
                    `).join('')
                }
            </select>
            <inputgroup id="${id}__options">
                ${
                    options.map((option) => {
                        if (!selectedOptions[option.value]) return ''
                        return html`
                            ${
                                MultipleSelectOption({
                                    id: `${id}-option-${option.value}`,
                                    label: option.label,
                                    value: option.value,
                                })
                            }
                        `
                    }).join('')
                }
            </inputgroup>
        </inputgroup>
    `
}

export default MultipleSelect

export {
    set,
    unset,

    update,
}