import { html } from 'saloe/html'


const WebHeroSection = ({
    preTitle,
    title,
    description,
    toolbox,
    isHeroImage = false,
    isReversed = false,
    thumbnail,
}) => {
    return html`
        <container class="WebHeroSection__container">
            <section 
                class="WebHeroSection"
                ${isHeroImage ? ' hero-image' : ''}
                ${isReversed ? ' reversed' : ''}
            >
                <header>
                    ${
                        Boolean(preTitle)
                            ? html`<span>${preTitle}</span>`
                            : ''
                    }
                    ${title}
                    <p>${description}</p>
                    <div class="WebHeroSection__header__toolbox">
                        ${toolbox} 
                    </div>
                </header>
                <figure class="WebHeroSection__thumbnail">
                    ${
                        Boolean(thumbnail)
                            ? html`
                                <img loading="lazy" src="${thumbnail}" width="100%" height="100%" alt="hero section">
                            `
                            : ''
                    }
                </figure>
            </section>
        </container>
    `
}

export default WebHeroSection;