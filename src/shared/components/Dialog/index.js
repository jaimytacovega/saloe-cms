import { html } from 'saloe/html'


const Dialog = ({
    id,
    children
}) => {
    return html`
        <dialog popover id="${id}">
            ${children}
        </dialog>
    `
}

export default Dialog