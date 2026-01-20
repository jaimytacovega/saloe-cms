import { html } from 'saloe/html'

import { MIN_CATEGORIES_LENGTH } from '@/features/web/utils'    


const WebNavigation = ({
    categories,
}) => {
    return html`
        <container class="WebNavigation__container">
            <div class="WebNavigation">
                <nav>
                    ${
                        categories?.map((category) => html`
                            <button>${category.name}</button>
                        `).join('')
                    }
                </nav>
                <button class="Button PrimaryButton">
                    <img loading="lazy" src="/img/icon/chevron-right-gray-1.svg" width="20" height="20" alt="search">
                </button>
            </div>
        </container>
    `   
}

export default WebNavigation