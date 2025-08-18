import { html } from 'saloe/html'

import SearchForm from '@/features/cms/components/SearchForm'


const CategoryToolbox = ({
    categoryId,
    searchParams,
}) => {
    return categoryId
        ? html`
            <a href="/cms/categorias" class="Button PrimaryButton PrimaryGray">
                <img src="/img/icon/corner-up-left-gray-1.svg" width="18" height="18" alt="go back">
                <span>Regresar a categorías</span>
            </a>
        `
        : html`
            ${
                SearchForm({
                    createUrl: '/cms/categorias/crear',
                    searchParams,
                })
            }
        `
}

export default CategoryToolbox