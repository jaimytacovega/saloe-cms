import { html } from 'saloe/html'

import CmsAsideNavigationTrigger from '@/features/cms/components/CmsAsideNavigationTrigger'


const TopMenu = ({
    companyName,
}) => {
    return html`
        <container class="TopMenu__container">
            <menu class="TopMenu">
            <p>${companyName}</p>
            ${
                CmsAsideNavigationTrigger()
            }
            </menu>
        </container>
    `
}
export default TopMenu