import { html } from 'saloe/html'


const Dialog = ({
    id,
    children,
    className,
}) => {
    return html`
        <dialog 
            popover 
            id="${id}" 
            ${
                Boolean(className)
                    ? `class="${className}"`
                    : ''
            }
        >
            ${children}
        </dialog>
    `
}

export default Dialog