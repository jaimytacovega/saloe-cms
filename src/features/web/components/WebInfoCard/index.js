import { html } from 'saloe/html'


const WebInfoCard = ({
    title,
    description,
    toolbox,
    isThumbnailWithTag = false,
    isPromo = false,
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
                </div>
            </div>
        </container>
    `
}

export default WebInfoCard