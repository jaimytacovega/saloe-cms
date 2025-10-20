import { html } from 'saloe/html'

import Dialog from '@/shared/components/Dialog'
import { isListUrl } from '@/features/cms/utils/utils'


const CmsAsideNavigation = ({
    pathname,
}) => {
    return html`
        <aside class="CmsAsideNavigation">
            ${
                Dialog({
                    id: 'cms-aside-navigation',
                    children: html`
                        <h6 class="Button PrimaryButton PrimaryGray">
                            <img loading="lazy" src="/img/icon/database-black.svg" width="20" height="20" alt="brand">
                            <span>GESTOR DE DATOS</span>
                        </h6>
                        <nav>
                            <a class="Button" href="/cms/marcas"${isListUrl({ pathname, listUrl: '/cms/marcas' }) ? ' aria-current="page"' : ''}>
                                <img loading="lazy" src="/img/icon/star-gray-1.svg" width="20" height="20" alt="brand"/>
                                <span>Marcas</span>
                            </a>
                            <a class="Button" href="/cms/promociones"${isListUrl({ pathname, listUrl: '/cms/promociones' }) ? ' aria-current="page"' : ''}>
                                <img loading="lazy" src="/img/icon/percent-gray-1.svg" width="20" height="20" alt="brand"/>
                                <span>Promociones</span>
                            </a>
                            <a class="Button" href="/cms/subcategorias"${isListUrl({ pathname, listUrl: '/cms/subcategorias' }) ? ' aria-current="page"' : ''}>
                                <img loading="lazy" src="/img/icon/hash-gray-1.svg" width="20" height="20" alt="brand"/>
                                <span>Subcategorías</span>
                            </a>
                            <a class="Button" href="/cms/categorias"${isListUrl({ pathname, listUrl: '/cms/categorias' }) ? ' aria-current="page"' : ''}>
                                <img loading="lazy" src="/img/icon/list-gray-1.svg" width="20" height="20" alt="brand"/>
                                <span>Categorías</span>
                            </a>
                            <a class="Button" href="/cms/productos"${isListUrl({ pathname, listUrl: '/cms/productos' }) ? ' aria-current="page"' : ''}>
                                <img loading="lazy" src="/img/icon/box-gray-1.svg" width="20" height="20" alt="brand"/>
                                <span>Productos</span>
                            </a>
                            <a class="Button" href="/cms/cotizaciones"${isListUrl({ pathname, listUrl: '/cms/cotizaciones' }) ? ' aria-current="page"' : ''}>
                                <img loading="lazy" src="/img/icon/file-text-gray-1.svg" width="20" height="20" alt="brand"/>
                                <span>Cotizaciones</span>
                            </a>
                        </nav>
                    `,
                })
            }
        </aside>
    `
}

export default CmsAsideNavigation