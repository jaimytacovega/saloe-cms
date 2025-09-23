import { html } from 'saloe/html'

import MultipleSelectOption from '@/shared/components/MultipleSelectOption'


const MultipleSelect = ({
    id,
    label,
    options = [],
    selectedOptions = {},
}) => {
    return html`
        <inputgroup>
            <label for="${id}__selector">${label}</label>
            <select id="${id}" multiple on-change="MultipleSelect.change">
                <optgroup label="Selecciona una o más opciones">
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
                <option disabled selected>Selecciona una o más opciones</option>
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
                        // return html`
                        //     <div class="Button PrimaryButton PrimaryGray">
                        //         <span>${option.label}</span>
                        //         <button 
                        //             id="${id}-option-${option.value}" 
                        //             value="${option.value}" 
                        //             type="button" 
                                    
                        //             on-click="MultipleSelectOptionButton.click"
                        //         >
                        //             <img loading="lazy" src="/img/icon/close-gray-1.svg" width="16" height="16" alt="remove">
                        //         </button>
                        //     </div>
                        // `
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