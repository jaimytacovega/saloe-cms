import { html } from 'saloe/html'


const WebHeroSection = ({
    preTitle,
    title,
    description,
    toolbox,
    isHeroImage = false,
    isReversed = false,
    isProductDetail = false,
    isSalesAdvisors = false,
    thumbnail,
    content,
}) => {
    return html`
        <container class="WebHeroSection__container">
            <section 
                class="WebHeroSection"
                ${isHeroImage ? ' hero-image' : ''}
                ${isReversed ? ' reversed' : ''}
                ${isProductDetail ? ' product-detail' : ''}
                ${isSalesAdvisors ? ' sales-advisors' : ''}
            >
                <header>
                    ${
                        Boolean(preTitle)
                            ? html`<span>${preTitle}</span>`
                            : ''
                    }
                    ${title}
                    <p>${description}</p>
                    ${
                        Boolean(toolbox)
                            ? html`
                                <div class="WebHeroSection__header__toolbox">
                                    ${toolbox}
                                </div>
                            `
                            : ''
                    }
                </header>
                ${
                    Boolean(thumbnail)
                        ? html`
                            <figure class="WebHeroSection__figure">
                                <img loading="lazy" src="${thumbnail}" width="100%" height="100%" alt="hero section">
                            </figure>
                        `
                        : ''
                }
                ${
                    Boolean(content)
                        ? html`
                            <div class="WebHeroSection__content">
                                ${content}
                            </div>
                        `
                        : ''
                }
            </section>
        </container>
    `
}

export default WebHeroSection;