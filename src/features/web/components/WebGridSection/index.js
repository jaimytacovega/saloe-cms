import { html } from 'saloe/html'

import WebInfoCard from '@/features/web/components/WebInfoCard'


const WebGridSection = () => {
    return html`
        <container class="WebGridSection__container">
            <section class="WebGridSection">
                <header>
                    <h3>Tubos y Conexiones de PVC</h3>
                    <p>
                        <span>Hasta 6 marcas disponibles</span>
                        <button class="ColorBlue">
                            <u>Descargar catálogos</u>
                        </button>
                    </p>
                </header>
                <div class="WebGridSection__grid" columns="4">
                    ${
                        WebInfoCard({
                            title: html`
                                <h5>Tubos y Conexiones de PVC</h5>
                            `,
                            description: html`
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
                            `,
                            toolbox: html`
                                <button class="Button PrimaryButton ColorBlue">
                                    <u>Me interesa</u>
                                </button>
                            `,
                        })
                    }
                    ${
                        WebInfoCard({
                            title: html`
                                <h5>Tubos y Conexiones de PVC</h5>
                            `,
                            description: html`
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
                            `,
                            toolbox: html`
                                <button class="Button PrimaryButton ColorBlue">
                                    <u>Me interesa</u>
                                </button>
                            `,
                        })
                    }
                    ${
                        WebInfoCard({
                            title: html`
                                <h5>Tubos y Conexiones de PVC</h5>
                            `,
                            description: html`
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
                            `,
                            toolbox: html`
                                <button class="Button PrimaryButton ColorBlue">
                                    <u>Me interesa</u>
                                </button>
                            `,
                        })
                    }
                    ${
                        WebInfoCard({
                            title: html`
                                <h5>Tubos y Conexiones de PVC</h5>
                            `,
                            description: html`
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
                            `,
                            toolbox: html`
                                <button class="Button PrimaryButton ColorBlue">
                                    <u>Me interesa</u>
                                </button>
                            `,
                        })
                    }
                </div>
            </section>
        </container>
    `
}

export default WebGridSection