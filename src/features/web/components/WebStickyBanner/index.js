import { html } from 'saloe/html'


const WebStickyBanner = ({
    brands,
    navigateToId,
}) => {
    return brands?.length > 0
        ? html`
            <container class="WebStickyBanner__container">
                <div class="WebStickyBanner">
                    <p>
                        Trabajamos con más de <strong>${brands.length} marcas</strong>, mira lo que tenemos disponible
                        <button 
                            class="ColorBlue" 

                            ${navigateToId ? `data-navigate-to="${navigateToId}"` : ''}

                            on-click="HomeBrandFilterStickySectionNavigateButton.click"
                        >
                            <u>Buscar por marca</u>
                        </button>
                    </p>
                </div>
            </container>
        ` : ''

}

export default WebStickyBanner