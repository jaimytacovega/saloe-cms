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