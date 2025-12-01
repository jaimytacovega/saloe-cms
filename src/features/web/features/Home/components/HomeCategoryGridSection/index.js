import { html } from 'saloe/html'

import WebGridSection from '@/features/web/components/WebGridSection'


const HomeCategoryGridSection = ({
    columns,
    grid,
}) => {
    return html`
        ${
            WebGridSection({
                title: html`
                    <h3>Tubos y Conexiones de PVC</h3>
                `,
                description: html`
                    <span>Hasta 6 marcas disponibles</span>
                    <button class="ColorBlue">
                        <u>Descargar catálogos</u>
                    </button>
                `,
                grid,
                columns,
            })
        }
    `
}

export default HomeCategoryGridSection