import { html } from 'saloe/html'


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
}) => {
    return html`
        <container class="WebInfoCard__container">
            <${isButton ? 'button' : 'div'} 
                class="WebInfoCard"
                ${isPromo ? ' promo' : ''}
                ${isItem ? ' item' : ''}
            >
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
                <div class="WebInfoCard__thumbnail">
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
            </${isButton ? 'button' : 'div'}>
        </container>
    `
}

export default WebInfoCard