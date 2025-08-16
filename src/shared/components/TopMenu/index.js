import { html } from 'saloe/html'

const TopMenu = ({
    companyName,
}) => {
    return html`
        <container class="TopMenu__container">
            <menu class="TopMenu">
            <p>${companyName}</p>
            <button class="Button PrimaryButton">
                <img loading="lazy" src="/img/icon/menu-black.svg" width="20" height="20" alt="menu">
            </button>
            </menu>
        </container>
    `
}
export default TopMenu