import { html } from 'saloe/html'

import WebTopMenu from '@/features/web/components/WebTopMenu'
import WebStickyBanner from '@/features/web/components/WebStickyBanner'
import WebNavigation from '@/features/web/components/WebNavigation'

const HomeMenu = ({
    brands,
    categories,
}) => {
    return html`
        ${
            WebTopMenu()
        }
        ${
            WebStickyBanner({
                brands,
            })
        }
        ${
            WebNavigation({
                categories,
            })
        }
    `
}

export default HomeMenu