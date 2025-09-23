import { html } from 'saloe/html'

import Dialog from '@/shared/components/Dialog'
import Input from '@/shared/components/Input'

import * as CategoryRepository from '@/shared/repositories/CategoryRepository'
import { Source } from '@/shared/utils/constants'


const CategoryDeleteDialog = async ({
    categoryId,
}) => {
    const { data: category } = categoryId === 'new'
        ? { data: {} }
        : await CategoryRepository.get({
            source: Source.FIREBASE,
            id: categoryId,
        })

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
                        id: 'id',
                        value: categoryId,
                        type: 'hidden',
                    })
                }
                ${
                    Input({
                        id: 'path',
                        value: category?.image?.path ?? '',
                        type: 'hidden',
                    })
                }
                ${
                    Input({
                        id: 'catalogPaths',
                        value: category?.catalogs?.map((catalog) => catalog.path) ?? '',
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