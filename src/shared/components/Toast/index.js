import { html } from 'saloe/html'

import { delay } from '@/shared/utils/utils'


const showToast = async ({
    toastId,
    toastTimeout,
}) => {
    const toast = document.getElementById(toastId)
    if (!toast){
        console.error(`Toast with id "${toastId}" not found`)
        return
    }

    toast.showPopover()
    await delay({ ms: toastTimeout })
    toast.hidePopover()
    await delay({ ms: 2_500 })
    toast.remove()
}

const Toast = ({
    id,
    message,
    timeout = 2_500,
    dataAttributes = '',
}) => {
    return html`
        <dialog 
            id="${id}"
            popover
            role="toast"

            data-timeout="${timeout}"
            ${Boolean(dataAttributes) ? dataAttributes : ''}
        >
            <p>${message}</p>
        </dialog>
    `
}

export default Toast

export {
    showToast,
} 