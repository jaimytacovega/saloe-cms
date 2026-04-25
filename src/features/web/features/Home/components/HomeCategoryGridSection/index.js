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
                id: `HomeCategoryGridSection-${category.id}`,
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
                attributes: html`
                    on-observe="WebGridSection.observe"
                    on-observer-threshold=".15"
                `,
            })
        }
    `
}

export default HomeCategoryGridSection