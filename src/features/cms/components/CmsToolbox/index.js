import { html } from 'saloe/html'

import CmsSearchForm from '@/features/cms/components/CmsSearchForm'


const CmsToolbox = ({
    id,
    searchParams,
    createUrl,
    listUrl,
    title,
    actions,
}) => {
    // return id
    //     ? html`
    //         <a href="${listUrl}?${searchParams?.toString()}" class="Button PrimaryButton PrimaryGray">
    //             <img src="/img/icon/corner-up-left-gray-1.svg" width="18" height="18" alt="regresar">
    //             <span>Regresar a ${title}</span>
    //         </a>
    //     `
    //     : html`
    //         ${
    //             CmsSearchForm({
    //                 createUrl,
    //                 searchParams,
    //             })
    //         }
    //         ${actions}
    //     `

    return html`
        ${
            CmsSearchForm({
                createUrl,
                searchParams,
            })
        }
        ${actions}
    `
}

export default CmsToolbox