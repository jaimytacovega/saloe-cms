import { html } from 'saloe/html'

import Dialog from '@/shared/components/Dialog'
import Input from '@/shared/components/Input'


const CategoryDeleteDialog = ({
    categoryId,
}) => {
    const dialogId = `DeleteCategoryDialog-${categoryId}`

    return Dialog({
        id: dialogId,
        children: html`
            <form on-submit="CategoryDeleteDialogForm.submit">
                <header>
                    <h2>Eliminar categoría</h2>
                </header>
                ${
                    Input({
                        id: 'categoryId',
                        value: categoryId,
                        type: 'hidden',
                    })
                }
                <inputgroup>
                    <p>¿Estás seguro de querer eliminar esta categoría? Esta acción no se puede deshacer.</p>
                    <br/>
                </inputgroup>
                <inputgroup>
                    <hr/>
                    <button type="button" class="Button PrimaryButton PrimaryGray" popovertarget="${dialogId}" popovertargetaction="hide">Cancelar</button>
                    <button type="submit" class="Button PrimaryButton PrimaryBlue">Eliminar</button>
                </inputgroup>
            </form>
        `
    })
}

export default CategoryDeleteDialog