import { html } from 'saloe/html'

import WebGridSection from '@/features/web/components/WebGridSection'
import Dropdown from '@/shared/components/Dropdown'


const catalogName = ({ path }) => {
    return path?.split('/').filter(Boolean).at(-1) ?? 'catálogo.pdf'
}

const HomeCategoryGridSection = ({
    category,
    columns,
    grid,
}) => {
    const catalogs = category.catalogs ?? []
    const catalogsDropdownId = `HomeCategoryCatalogs-${category.id}`

    return html`
        ${
            WebGridSection({
                id: `HomeCategoryGridSection-${category.id}`,
                title: html`
                    <h3>${category.name}</h3>
                `,
                description: html`
                    <span>Hasta ${category.brandIds.length} marcas disponibles.</span>
                    ${
                        catalogs.length
                            ? Dropdown({
                                id: catalogsDropdownId,
                                trigger: html`
                                    <button class="ColorBlue" type="button" popovertarget="${catalogsDropdownId}">
                                        <u>Descargar catálogos</u>
                                    </button>
                                `,
                                content: html`
                                    <div class="WebGridSection__catalogs">
                                        ${
                                            catalogs.map((catalog) => {
                                                const name = catalogName({ path: catalog.path })

                                                return html`
                                                    <a
                                                        href="${catalog.downloadURL}"
                                                        download="${name}"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        popovertarget="${catalogsDropdownId}"
                                                        popovertargetaction="hide"
                                                    >${name}</a>
                                                `
                                            }).join('')
                                        }
                                    </div>
                                `,
                            })
                            : ''
                    }
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