import { html } from 'saloe/html'

import WebTopMenu from '@/features/web/components/WebTopMenu'
import WebStickyBanner from '@/features/web/components/WebStickyBanner'
import WebNavigation from '@/features/web/components/WebNavigation'

import * as WebHook from '@/features/web/hooks/WebHook'


const HomeMenu = async ({
    isSearch = false,
}) => {
    const { data: categories } = isSearch
        ? { data: [] }
        :  await WebHook.useListCategories({ ttl: 10_000 })
        
    const { data: brands } = isSearch
        ? { data: [] }
        : await WebHook.useListBrandsByCategories({ categories, ttl: 10_000 })

    return html`
        ${
            WebTopMenu()
        }
        ${
            isSearch
                ? ''
                : html`
                    ${
                        WebStickyBanner()
                    }
                    ${
                        WebNavigation({
                            categories,
                        })
                    }
                `
        }
    `
}

export default HomeMenu