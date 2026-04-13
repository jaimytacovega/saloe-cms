import { html } from 'saloe/html'


const Input = ({
    id,
    label,
    type = 'text',
    value,
    placeholder,
    name = '',
    checked = false,
    reverse = false,
    data = '',
}) => {
    const labelHtml = label
        ? html`
            <label for="${id}">${label}</label>
        `
        : ''

    const inputHtml = html`
        <input 
            type="${type}" 
            id="${id}" 
            placeholder="${placeholder}" 
            value="${value}" 
            ${name ? `name="${name}"` : ''}
            ${checked ? `checked` : ''}
            ${data}
        />
    `

    return html`
        <inputgroup>
            ${
                reverse
                    ? `${inputHtml} ${labelHtml}`
                    : `${labelHtml} ${inputHtml}`
            }
        </inputgroup>
    `
}

export default Input