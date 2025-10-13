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