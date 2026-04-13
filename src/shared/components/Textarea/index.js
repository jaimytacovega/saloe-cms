import { html } from 'saloe/html'


const Textarea = ({
    id,
    label,
    value,
    placeholder,
    data,
}) => {
    return html`
        <inputgroup>
            <label for="${id}">${label}</label>
            <textarea 
                id="${id}" 
                placeholder="${placeholder}"
                ${data}
            >${value}</textarea>
        </inputgroup>   
    `
}

export default Textarea