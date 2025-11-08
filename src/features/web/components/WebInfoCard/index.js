import { html } from 'saloe/html'


const WebInfoCard = ({
    title,
    description,
    toolbox,
}) => {
    return html`
        <container class="WebInfoCard__container">
            <div class="WebInfoCard">
                <header>
                    ${title}
                    ${description}
                </header>
                <div class="WebInfoCard__toolbox">
                    ${toolbox}
                </div>
                <figure>
                </figure>
            </div>
        </container>
    `
}

export default WebInfoCard