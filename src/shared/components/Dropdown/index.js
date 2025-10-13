import { html } from 'saloe/html'


const Dropdown = ({
    id,
    trigger,
    content,
}) => {
    return html`
        <div class="Dropdown">
            ${trigger}
            <dialog id="${id}" popover>
                ${content}
            </dialog>
        </div>
    `
}

export default Dropdown