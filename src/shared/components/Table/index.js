import { html } from 'saloe/html'


const EmptyTable = () => {
    return html`
        <table empty>
            <tbody>
                <tr>
                    <td>
                        <header>
                            <h5>Aun no se registran datos</h5>
                            <p>Crea nuevos registros y gestionalos desde esta sección</p>
                        </header>
                        <a href="/cms/categorias/crear" class="Button PrimaryButton PrimaryBlue">
                            <img loading="lazy" src="/img/icon/plus-white.svg" width="16" height="16" alt="Crear">
                            <span>Crear</span>
                        </a>
                    </td>
                </tr>
            </tbody>
        </table>
    `
}

const Table = ({
    rows = [],
}) => {
    return rows.length > 0
        ? html`
            <table>
                <tbody>
                    ${
                        (rows ?? []).map((row) => html`
                            <tr>
                                <td>
                                    ${row}
                                </td>
                            </tr>
                        `).join('')
                    }
                </tbody>
            </table>
        `
        : EmptyTable()
}

export default Table