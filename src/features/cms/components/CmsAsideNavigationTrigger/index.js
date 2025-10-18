import { html } from 'saloe/html'


const CmsAsideNavigationTrigger = () => {
    return html`
        <button 
            class="CmsAsideNavigationTrigger Button PrimaryButton" 
            popovertarget="cms-aside-navigation"
        >
            <img loading="lazy" src="/img/icon/menu-black.svg" width="20" height="20" alt="menu" open>
            <img loading="lazy" src="/img/icon/x-black.svg" width="20" height="20" alt="menu" close>
        </button>
    `
}

export default CmsAsideNavigationTrigger