import { html } from 'saloe/html'


const MultipleSelect = ({
    id,
    label,
    options = [],
}) => {
    return html`
        <inputgroup>
            <label for="${id}__selector">${label}</label>
            <select id="${id}" multiple on-change="MultipleSelect.change">
                <optgroup label="Selecciona una o más opciones">
                    ${
                        options.map((option) => html`
                            <option value="${option.value}">${option.label}</option>
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
            <inputgroup id="${id}__options"></inputgroup>
        </inputgroup>
    `
}

export default MultipleSelect