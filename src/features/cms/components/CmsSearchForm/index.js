import { html } from 'saloe/html'


const CmsSearchForm = ({
    searchParams,
}) => {
    return html`
        <form on-submit="CmsSearchForm.submit">
            <inputgroup>
                <img loading="lazy" src="/img/icon/search-black.svg" width="16" height="16" alt="search">
                <input name="search" type="search" placeholder="Buscar" value="${searchParams?.get('search') ?? ''}"/>
            </inputgroup>
        </form>
    `
}

export default CmsSearchForm