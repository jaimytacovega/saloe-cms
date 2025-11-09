import { html } from 'saloe/html'

import WebTopMenu from '@/features/web/components/WebTopMenu'
import WebStickyBanner from '@/features/web/components/WebStickyBanner'
import WebNavigation from '@/features/web/components/WebNavigation'

const HomeMenu = () => {
    return html`
        ${
            WebTopMenu()
        }
        ${
            WebStickyBanner()
        }
        ${
            WebNavigation()
        }
    `
}

export default HomeMenu