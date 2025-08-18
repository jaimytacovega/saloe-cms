import { html } from 'saloe/html'


const Input = ({
    id,
    label,
    type = 'text',
    value,
    placeholder,
}) => {
    return html`
        <inputgroup>
            <label for="${id}">${label}</label>
            <input type="${type}" id="${id}" placeholder="${placeholder}" value="${value}" />
        </inputgroup>
    `
}

export default Input