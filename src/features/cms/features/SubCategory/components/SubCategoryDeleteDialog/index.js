import { html } from 'saloe/html'

import Dialog from '@/shared/components/Dialog'
import Input from '@/shared/components/Input'

import * as SubCategoryRepository from '@/shared/repositories/SubCategoryRepository'
import { Source } from '@/shared/utils/constants'


const SubCategoryDeleteDialog = async ({
    subCategoryId,
}) => {
    const { data: subCategory } = subCategoryId === 'new'
        ? { data: {} }
        : await SubCategoryRepository.get({
            source: Source.FIREBASE,
            id: subCategoryId,
        })

    const dialogId = `DeleteSubCategoryDialog-${subCategoryId}`

    return Dialog({
        id: dialogId,
        children: html`
            <form on-submit="SubCategoryDeleteDialogForm.submit">
                <header>
                    <h2>Eliminar subcategoría</h2>
                </header>
                ${
                    Input({
                        id: 'id',
                        value: subCategoryId,
                        type: 'hidden',
                    })
                }
                ${
                    Input({
                        id: 'imagePath',
                        value: subCategory?.image?.path ?? '',
                        type: 'hidden',
                    })
                }
                <inputgroup>
                    <p>¿Estás seguro de querer eliminar esta subcategoría? Esta acción no se puede deshacer.</p>
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

export default SubCategoryDeleteDialog