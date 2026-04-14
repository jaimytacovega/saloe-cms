import { html } from 'saloe/html'

import WebAddToQuotationButton from '@/features/web/components/WebAddToQuotationButton'


const WebInfoCard = ({
    title,
    description,
    toolbox,
    isThumbnailWithTag = false,
    isPromo = false,
    isItem = false,
    thumbnail,
    isButton = false,
    tagThumbnail,
    webQuotationData: {
        toastId,
        toastMessage,
        toastTimeout,
        itemId,
        itemType,
    } = {},
}) => {
    const attributes = html`
        ${isPromo ? ' promo' : ''}
        ${isItem ? ' item' : ''}
    `
    
    const children = html`
        <header>
            ${title}
            ${description}
        </header>
        ${
            Boolean(toolbox) ? 
                html`
                    <div class="WebInfoCard__toolbox">
                        ${toolbox}
                    </div>
                `
                : ''
        }
        <div class="WebInfoCard__figure">
            ${
                isThumbnailWithTag
                    ? html`
                        <figure>
                            <img loading="lazy" src="${tagThumbnail}" width="100%" height="100%" alt="tag thumbnail">
                        </figure>
                    `
                    : ''
            }
            ${
                Boolean(thumbnail)
                    ? html`
                        <img loading="lazy" src="${thumbnail}" width="100%" height="100%" alt="thumbnail">
                    `
                    : ''
            }
        </div>
    `

    if (Boolean(toastId)) {
        return html`
            <container class="WebInfoCard__container">
                ${
                    WebAddToQuotationButton({
                        toastId,
                        toastMessage,
                        toastTimeout,
                        itemId,
                        itemType,
                        className: 'WebInfoCard',
                        attributes,
                        children,
                    })
                }
            </container>
        `
    }

    return html`
        <container class="WebInfoCard__container">
            <${isButton ? 'button' : 'div'} 
                class="WebInfoCard"
                ${attributes}
            >
                ${children}
            </${isButton ? 'button' : 'div'}>
        </container>
    `
}

export default WebInfoCard