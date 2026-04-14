import { html } from 'saloe/html'

import WebGridSection from '@/features/web/components/WebGridSection'


const HomeCategoryGridSection = ({
    category,
    columns,
    grid,
}) => {
    return html`
        ${
            WebGridSection({
                title: html`
                    <h3>${category.name}</h3>
                `,
                description: html`
                    <span>Hasta ${category.brandIds.length} marcas disponibles</span>
                    <!--
                    <button class="ColorBlue">
                        <u>Descargar catálogos</u>
                    </button>
                    -->
                `,
                grid,
                columns,
            })
        }
    `
}

export default HomeCategoryGridSection