import { html } from 'saloe/html'

import CmsAsideNavigationTrigger from '@/features/cms/components/CmsAsideNavigationTrigger'


const TopMenu = ({
    companyName,
}) => {
    return html`
        <container class="TopMenu__container">
            <menu class="TopMenu">
                <menu>
                    <p>${companyName}</p>
                    <a class="Button PrimaryButton PrimaryGray" href="/" target="_blank">Ir al sitio</a>
                </menu>
                ${
                    CmsAsideNavigationTrigger()
                }
            </menu>
        </container>
    `
}
export default TopMenu