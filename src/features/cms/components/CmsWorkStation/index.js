import { html } from 'saloe/html'

import WorkStation from '@/shared/components/WorkStation'


const CmsWorkStation = async ({
    id,
    header,
    toolbox,
    table,
    addOrUpdateForm,
    deleteDialog,
    notFoundItem,
}) => {
    return html`
        ${
            WorkStation({
                header,
                toolbox,
                table,
                form: Boolean(id)
                    ? html`
                        ${
                            addOrUpdateForm
                                ? await addOrUpdateForm({ id })
                                : ''
                        }
                        ${
                            deleteDialog
                                ? await deleteDialog({ id })
                                : ''
                        }
                    ` 
                    : html`
                        ${
                            notFoundItem ?? ''
                        }   
                    `,
            })
        }
    `
}

export default CmsWorkStation