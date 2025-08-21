import { html } from 'saloe/html'


const Select = ({
    id,
    label,
    options = [],
    value,
}) => {
    return html`
        <inputgroup>
            <label for="${id}">${label}</label>
            <select id="${id}" value="${value ?? ''}">
                <option disabled value="" ${Boolean(value) ? '' : 'selected'}>Selecciona una opción</option>
                ${
                    options.map((option) => html`
                        <option value="${option.value}">${option.label}</option>
                    `).join('')
                }
            </select>
        </inputgroup>
    `
}

export default Select