import { html } from 'saloe/html'


const CmsSearchForm = ({
    createUrl,
    searchParams,
}) => {
    return html`
        <form on-submit="CmsSearchForm.submit">
            <inputgroup>
                <img loading="lazy" src="/img/icon/search-black.svg" width="16" height="16" alt="search">
                <input id="search" type="search" placeholder="Buscar" value="${searchParams?.get('search') ?? ''}"/>
            </inputgroup>
            <inputgroup>
                <button type="button" class="Button PrimaryButton PrimaryGray">Filtrar</button>
                <button type="button" class="Button PrimaryButton PrimaryGray">Ir a</button>
                <button type="button" class="Button PrimaryButton PrimaryGray">Ordenar</button>
                <hr>
                <a href="${createUrl}?${searchParams?.toString()}" class="Button PrimaryButton PrimaryBlue">Crear</a>
            </inputgroup>
        </form>
    `
}

export default CmsSearchForm