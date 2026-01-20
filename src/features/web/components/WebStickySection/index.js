import { html } from 'saloe/html'

import WebGridSection from '@/features/web/components/WebGridSection'
import WebInfoCard from '@/features/web/components/WebInfoCard'
import WebSearchButton from '@/features/web/components/WebSearchButton'

import { MIN_BRANDS_LENGTH } from '@/features/web/utils'


const ItemGrid = ({
    category,
    subCategories,
    columns,
}) => WebGridSection({
    title: html`
        <h5>${category.name}</h5>
    `,
    grid: subCategories.map((subCategory) => {
        return WebInfoCard({
            title: html`
                <h6>${subCategory.name}</h6>
            `,
            description: html`
                <p>
                    <span>${subCategory.description}</span>
                </p>
            `,
            isItem: true,
            thumbnail: subCategory.image.downloadURL,
            isButton: true,
        })
    }).join(''),
    columns,
    isItem: true,
})

const PromotionsGrid = ({
    promotions,
}) => WebGridSection({
    title: promotions.length > 0 ? html`
        <h5>Promociones</h5>
    ` : '',
    grid: promotions.map((promotion) => {
        return WebInfoCard({
            title: html`
                <h6>${promotion.name}</h6>
            `,
            description: html`
                <p>
                    <span>${promotion.description}</span>
                </p>
            `,
            toolbox: html`
                <button class="Button PrimaryButton PrimaryBlue">Quiero esta promoción</button>
            `,
            isItem: true,
            thumbnail: promotion.image.downloadURL,
        })
    }).join(''),
    columns: 1,
    isItem: true,
})

const WebStickySection = ({
    id,
    brands,
    categories,
    subCategoryIdsMapByCategoryIdMap,
    promotions,
    isSearch = false,
    filteredBrandsMap = new Map(),
}) => {
    return html`
        <container 
            class="WebStickySection__container" 
            ${id ? `id="${id}"` : ''}
        >
            <section 
                class="WebStickySection"
                ${isSearch ? 'sticky' : ''}
            >
                <header>
                    <h3>¿Qué marcas estas buscando?</h3>
                    <p>Selecciona una o varias marcas y mira lo que tenemos disponible</p>
                    <nav>
                        ${
                            brands?.map((brand) => {
                                return WebSearchButton({
                                    key: 'brandIds',
                                    param: brand.id,
                                    isSelected: filteredBrandsMap.has(brand.id),
                                    children: html`
                                        <img loading="lazy" src="${brand.image.downloadURL}" width="48" height="48" alt="Filtrar por marca ${brand.name}">
                                    `,
                                })
                            }).join('')
                        }
                    </nav>
                </header>
                <div class="WebStickySection__scroller">
                    ${
                        categories.map((category) => {
                            const subCategoryIdsMap = subCategoryIdsMapByCategoryIdMap.get(category.id)
                            const subCategories = [...(subCategoryIdsMap ?? new Map()).values()]
                            
                            return ItemGrid({
                                category,
                                subCategories,
                                columns: 1,
                            })
                        }).join('')
                    }
                    ${
                        PromotionsGrid({
                            promotions,
                        })
                    }
                </div>
                <footer>
                    <a 
                        href="/"
                        class="Button PrimaryButton BorderedGray1" 
                        full-width content-center

                        on-click="HomeBrandFilterStickySectionCloseButton.click"
                    >Regresar al inicio</a>
                </footer>
            </section>
        </container>
    `
}

export default WebStickySection