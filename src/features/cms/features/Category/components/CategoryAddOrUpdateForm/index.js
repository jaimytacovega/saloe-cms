import { html } from 'saloe/html'

import Input from '@/shared/components/Input'
import InputFile from '@/shared/components/InputFile'

import NotFoundItem from '@/features/cms/components/NotFoundItem'

import * as CategoryRepository from '@/shared/repositories/CategoryRepository'
import { Source } from '@/shared/utils/constants'
import { lastUpdatedMessage } from '@/shared/utils/utils'


const CategoryAddOrUpdateForm = async ({
    categoryId,
}) => {
    const { data: category } = categoryId === 'new'
        ? { data: {} }
        : await CategoryRepository.get({
            source: Source.FIREBASE,
            id: categoryId,
        })

    return Boolean(category)
        ? html`
            <form on-submit="Category${categoryId === 'new' ? 'Add' : 'Update'}Form.submit">
                <header>
                    <p>CATEGORÍA</p>
                    <h2>${category?.code ?? 'Nueva categoría'}</h2>
                </header>
                <div class="form__scroller">
                    <fieldset columns="1">
                        ${
                            Input({
                                id: 'id',
                                value: categoryId,
                                type: 'hidden',
                            })
                        }
                        ${
                            Input({
                                id: 'name',
                                label: 'Nombre',
                                value: category?.name ?? '',
                                placeholder: 'Ingresa el nombre de la categoría',
                            })
                        }
                        ${
                            Input({
                                id: 'code',
                                label: 'Código',
                                value: category?.code ?? '',
                                placeholder: 'Ingresa el código de la categoría',
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
                            InputFile({
                                id: 'image',
                                label: 'Imagen',
                                src: category?.image?.downloadURL ?? '',
                            })
                        }
                    </fieldset>
                </div>
                <inputgroup>
                    ${
                        categoryId === 'new'
                            ? html`
                                <a href="/cms/categorias" class="Button PrimaryButton PrimaryGray">
                                    <img src="/img/icon/corner-up-left-black.svg" width="18" height="18" alt="go back">
                                </a>
                            `
                            : html`
                                <button popovertarget="DeleteCategoryDialog-${categoryId}" type="button" class="Button PrimaryButton PrimaryGray">
                                    <img src="/img/icon/trash-black.svg" width="18" height="18" alt="trash">
                                </button>
                            `
                    }
                    <hr>
                    ${
                        categoryId !== 'new'
                            ? html`
                                <small>${lastUpdatedMessage({ date: category.updatedAt ?? category.createdAt })}</small>
                            `
                            : ''
                    }
                    <button class="Button PrimaryButton PrimaryBlue" type="submit">Guardar</button>
                </inputgroup>
            </form>
        `
        : NotFoundItem({
            createUrl: '/cms/categorias',
        })
}

export default CategoryAddOrUpdateForm