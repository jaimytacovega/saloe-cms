import { html } from 'saloe/html'

import Input from '@/shared/components/Input'

import * as CategoryRepository from '@/shared/repositories/CategoryRepository'
import { Source } from '@/shared/utils/constants'


const CategoryForm = async ({
    categoryId,
}) => {
    const { data: category } = await CategoryRepository.get({
        source: Source.FIREBASE,
        id: categoryId,
    })

    return html`
        <form on-submit="AddCategoryForm.submit">
            <header>
                <p>CATEGORÍA</p>
                <h2>${category?.code ?? 'Nueva categoría'}</h2>
            </header>
            <div class="form__scroller">
                <fieldset columns="1">
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
                            <button class="Button PrimaryButton PrimaryGray">
                                <img src="/img/icon/trash-black.svg" width="18" height="18" alt="trash">
                            </button>
                        `
                }
                <hr>
                <button class="Button PrimaryButton PrimaryBlue" type="submit">Guardar</button>
            </inputgroup>
        </form>
    `
}

const test = 1

export {
    test,
}

export default CategoryForm