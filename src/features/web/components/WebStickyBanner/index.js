import { html } from 'saloe/html'


const WebStickyBanner = ({
    brands,
}) => {
    return brands?.length > 0
        ? html`
            <container class="WebStickyBanner__container">
                <div class="WebStickyBanner">
                    <p>
                        Trabajamos con más de <strong>${brands.length} marcas</strong>, mira lo que tenemos disponible
                        <a href="/" class="ColorBlue">
                            <u>Buscar por marca</u>
                        </a>
                    </p>
                </div>
            </container>
        ` : ''

}

export default WebStickyBanner