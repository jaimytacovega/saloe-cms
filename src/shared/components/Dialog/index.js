import { html } from 'saloe/html'


const Dialog = ({
    id,
    children,
    className,
}) => {
    return html`
        <dialog  
            id="${id}" 
            popover
            role="dialog"
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