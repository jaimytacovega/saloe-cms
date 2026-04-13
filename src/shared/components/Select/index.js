import { html } from 'saloe/html'


const Select = ({
    id,
    label,
    options = [],
    value,
    data = '',
}) => {
    return html`
        <inputgroup>
            <label for="${id}">${label}</label>
            <select 
                id="${id}" 
                value="${value ?? ''}"
                ${data}
            >
                <option disabled value="" ${Boolean(value) ? '' : 'selected'}>Selecciona una opción</option>
                ${
                    options.map((option) => html`
                        <option value="${option.value}"${option.value === value ? ' selected' : ''}>${option.label}</option>
                    `).join('')
                }
            </select>
        </inputgroup>
    `
}

export default Select