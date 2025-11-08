import { html } from 'saloe/html'


const WebNavigation = () => {
    return html`
        <container class="WebNavigation__container">
            <div class="WebNavigation">
                <nav>
                    <button toggled>Tubos y Conexiones de PVC</button>
                    <button>Pegamentos y aditivos</button>
                    <button>Lijas</button>
                    <button>Discos</button>
                    <button>Pinturas en Spray</button>
                </nav>
                <button class="Button PrimaryButton">
                    <img loading="lazy" src="/img/icon/chevron-right-gray-1.svg" width="20" height="20" alt="search">
                </button>
            </div>
        </container>
    `   
}

export default WebNavigation