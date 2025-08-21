import { html } from 'saloe/html'


const Textarea = ({
    id,
    label,
    value,
    placeholder,
}) => {
    return html`
        <inputgroup>
            <label for="${id}">${label}</label>
            <textarea id="${id}" placeholder="${placeholder}">${value}</textarea>
        </inputgroup>   
    `
}

export default Textarea