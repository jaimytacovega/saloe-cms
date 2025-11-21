import { html } from 'saloe/html'


const WebInfoCard = ({
    title,
    description,
    toolbox,
    isThumbnailWithTag = false,
    isPromo = false,
    thumbnail,
}) => {
    return html`
        <container class="WebInfoCard__container">
            <div 
                class="WebInfoCard"
                ${isPromo ? ' promo' : ''}
            >
                <header>
                    ${title}
                    ${description}
                </header>
                <div class="WebInfoCard__toolbox">
                    ${toolbox}
                </div>
                <div class="WebInfoCard__thumbnail">
                    ${
                        isThumbnailWithTag
                            ? html`
                                <figure>
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
            </div>
        </container>
    `
}

export default WebInfoCard