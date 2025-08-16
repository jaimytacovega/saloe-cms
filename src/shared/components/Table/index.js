import { html } from 'saloe/html'


const Table = ({
    rows,
}) => {
    return html`
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
}

export default Table