import { html } from 'saloe/html'


const LogoutButton = () => {
    return html`
        <button class="Button" on-click="LogoutButton.click">
            <img loading="lazy" src="/img/icon/log-out-gray-1.svg" width="20" height="20" alt="brand"/>
            <span>Cerrar sesión</span>
        </button>
    `
}

export default LogoutButton