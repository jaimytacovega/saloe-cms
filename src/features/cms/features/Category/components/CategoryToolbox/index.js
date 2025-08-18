import { html } from 'saloe/html'


const CategoryToolbox = ({
    categoryId,
}) => {
    return categoryId
        ? html`
            <a href="/cms/categorias" class="Button PrimaryButton PrimaryGray">
                <img src="/img/icon/corner-up-left-gray-1.svg" width="18" height="18" alt="go back">
                <span>Regresar a categorías</span>
            </a>
        `
        : html`
            <form>
                <inputgroup>
                    <img loading="lazy" src="/img/icon/search-black.svg" width="16" height="16" alt="search">
                    <input type="search" placeholder="Buscar"/>
                </inputgroup>
                <inputgroup>
                    <button class="Button PrimaryButton PrimaryGray">Filtrar</button>
                    <button class="Button PrimaryButton PrimaryGray">Ir a</button>
                    <button class="Button PrimaryButton PrimaryGray">Ordenar</button>
                    <hr>
                    <a href="/cms/categorias/crear" class="Button PrimaryButton PrimaryBlue">Crear</a>
                </inputgroup>
            </form>
        `
}

export default CategoryToolbox