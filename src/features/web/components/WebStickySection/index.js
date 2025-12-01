import { html } from 'saloe/html'

import WebGridSection from '@/features/web/components/WebGridSection'
import WebInfoCard from '@/features/web/components/WebInfoCard'


const ItemCard = () => WebInfoCard({
    title: html`
        <h6>Tubos de agua 1/2 C/R Nicoll</h6>
    `,
    description: html`
        <p>
            <span>Lorem ipsum dolor sit amet consectetur.</span>
        </p>
    `,
    isItem: true,
    thumbnail: '/img/thumbnail/promotion.png',
    isButton: true,
})

const ItemGrid = () => WebGridSection({
    title: html`
        <h5>Tubos y Conexiones de PVC</h5>
    `,
    grid: [
        ItemCard(),
        ItemCard(),
    ].join(''),
    columns: 1,
    isItem: true,
})

const PromoCard = () => WebInfoCard({
    title: html`
        <h6>Tubos de agua 1/2 C/R Nicoll</h6>
    `,
    description: html`
        <p>
            <span>Lorem ipsum dolor sit amet consectetur.</span>
        </p>
    `,
    toolbox: html`
        <button class="Button PrimaryButton PrimaryBlue">Quiero esta promoción</button>
    `,
    isItem: true,
    thumbnail: '/img/thumbnail/promotion.png',
})

const PromoGrid = () => WebGridSection({
    title: html`
        <h5>Promociones</h5>
    `,
    grid: [
        PromoCard(),
        PromoCard(),
    ].join(''),
    columns: 1,
    isItem: true,
})

const WebStickySection = () => {
    return html`
        <container class="WebStickySection__container">
            <section class="WebStickySection">
                <header>
                    <h3>¿Qué marcas estas buscando?</h3>
                    <p>Selecciona una o varias marcas y mira lo que tenemos disponible</p>
                    <nav>
                        <a href="/"></a>
                        <a href="/"></a>
                        <a href="/"></a>
                        <a href="/"></a>
                        <a href="/"></a>
                        <a href="/"></a>
                        <a href="/"></a>
                        <a href="/"></a>
                        <a href="/"></a>
                        <a href="/"></a>
                        <a href="/"></a>
                        <a href="/"></a>
                    </nav>
                </header>
                <div class="WebStickySection__scroller">
                    ${
                        [
                            ItemGrid(),
                            ItemGrid(), 
                            ItemGrid(),
                            PromoGrid(),
                        ].join('')
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