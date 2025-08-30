import { html } from 'saloe/html'


const NotFoundItem = ({
    header,
    createUrl,
}) => {
    return html`
        <table empty>
            <tbody>
                <tr>
                    <td>
                        <header>
                            ${header}
                        </header>
                        ${
                            Boolean(createUrl)
                                ? html`
                                    <a href="${createUrl}" class="Button PrimaryButton PrimaryBlue">
                                        <img loading="lazy" src="/img/icon/plus-white.svg" width="16" height="16" alt="Crear">
                                        <span>Crear</span>
                                    </a>
                                `
                                : ''
                        }
                    </td>
                </tr>
            </tbody>
        </table>
    `
}   

export default NotFoundItem