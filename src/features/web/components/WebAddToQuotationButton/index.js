import { html } from 'saloe/html'


const AddToQuotationButtonTypes = {
    SubCategory: 'subCategory',
    Promotion: 'promotion',
}

const WebAddToQuotationButton = ({
    toastId,
    toastMessage,
    toastTimeout,
    itemId,
    itemType,
    className,  
    children,
}) => {
    return html`
        <button
            class="${className}"
            
            data-toast-id="${toastId}"
            data-toast-message="${toastMessage}"
            data-toast-timeout="${toastTimeout}"
            data-item-id="${itemId}"
            data-item-type="${itemType}"

            on-click="WebAddToQuotationButton.click"
        >
            ${children}
        </button>
    `
}

export default WebAddToQuotationButton

export {
    AddToQuotationButtonTypes,
}