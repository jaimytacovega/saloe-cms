import { html } from 'saloe/html'


const WebTopMenu = () => {
    return html`
        <container class="WebTopMenu__container">
            <menu class="WebTopMenu">
                <a href="/" class="Button">
                    <img loading="lazy" src="/img/logo/logo-3.png" width="48" height="48" alt="logo">
                </a>
                <nav>
                    <a href="/">
                        <span>Inicio</span>
                    </a>
                    <a href="/">
                        <span>Productos</span>
                    </a>
                </nav>
                <div class="WebTopMenu__toolbox">
                    <a href="tel:+51918282233" class="Button PrimaryButton PrimaryGray">
                        <img loading="lazy" src="/img/icon/phone-call-gray-1.svg" width="20" height="20" alt="phone">
                        <span>Habla con un asesor</span>
                    </a>
                    <button 
                        class="Button PrimaryButton PrimaryBlue"

                        on-click="WebQuotationDialogTargetButton.click"
                    >
                        <span>Cotizar pedido</span>
                    </button>
                </div>
            </menu>
        </container>
    `
}

export default WebTopMenu