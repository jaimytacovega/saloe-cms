import { html } from 'saloe/html'


const Select = ({
    id,
    label,
    options = [],
}) => {
    return html`
        <inputgroup>
            <label for="${id}">${label}</label>
            <select id="${id}">
                <option disabled selected>Selecciona una opción</option>
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