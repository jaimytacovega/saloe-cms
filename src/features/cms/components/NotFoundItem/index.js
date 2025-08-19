import { html } from 'saloe/html'


const NotFoundItem = ({
    createUrl,
}) => {
    return html`
        <table empty>
            <tbody>
                <tr>
                    <td>
                        <header>
                            <h5>Aun no se registran datos</h5>
                            <p>Crea nuevos registros y gestionalos desde esta sección</p>
                        </header>
                        <a href="${createUrl}" class="Button PrimaryButton PrimaryBlue">
                            <img loading="lazy" src="/img/icon/plus-white.svg" width="16" height="16" alt="Crear">
                            <span>Crear</span>
                        </a>
                    </td>
                </tr>
            </tbody>
        </table>
    `
}   

export default NotFoundItem