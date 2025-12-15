import { html } from 'saloe/html'

import WebGridSection from '@/features/web/components/WebGridSection'
import WebInfoCard from '@/features/web/components/WebInfoCard'

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
    title: html`
        <h5>Promociones</h5>
    `,
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
    brands,
    categories,
    subCategoryIdsMapByCategoryIdMap,
    promotions,
}) => {
    return html`
        <container class="WebStickySection__container">
            <section class="WebStickySection">
                <header>
                    <h3>¿Qué marcas estas buscando?</h3>
                    <p>Selecciona una o varias marcas y mira lo que tenemos disponible</p>
                    <nav>
                        ${
                            (
                                brands.length < 1
                                    ? []
                                    : Array.from(
                                        { length: MIN_BRANDS_LENGTH },
                                        (_, i) => brands[i % brands.length]
                                    )
                            ).map((brand) => {
                                return html`
                                    <a href="/">
                                        <img loading="lazy" src="${brand.image.downloadURL}" width="48" height="48" alt="Filtrar por marca ${brand.name}">
                                    </a>
                                `
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
                    <button class="Button PrimaryButton BorderedGray1" full-width content-center>Regresar al inicio</button>
                </footer>
            </section>
        </container>
    `
}

export default WebStickySection