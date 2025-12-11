import { html } from 'saloe/html'

import WebTopMenu from '@/features/web/components/WebTopMenu'
import WebStickyBanner from '@/features/web/components/WebStickyBanner'

import * as WebHook from '@/features/web/hooks/WebHook'


const ProductMenu = async () => {
    const { data: categories } = await WebHook.useListCategories({ ttl: 10_000 })
    const { data: brands } = await WebHook.useListBrandsByCategories({ categories, ttl: 10_000 })

    return html`
        ${
            WebTopMenu()
        }
        ${
            WebStickyBanner({
                brands,
            })
        }
    `
}

export default ProductMenu