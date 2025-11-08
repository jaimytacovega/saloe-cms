import { html } from 'saloe/html'


const WebHeroSection = ({
    preTitle,
    title,
    description,
    toolbox,
}) => {
    return html`
        <container class="WebHeroSection__container">
            <section class="WebHeroSection">
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
                    <!--
                    <img loading="lazy" src="/img/hero-section.png" width="100%" height="100%" alt="hero section">
                    -->
                </figure>
            </section>
        </container>
    `
}

export default WebHeroSection;