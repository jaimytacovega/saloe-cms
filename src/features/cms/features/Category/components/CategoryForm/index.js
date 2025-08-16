import { html } from 'saloe/html'

import { DUMMY_CATEGORIES } from '@/features/cms/features/Category/utils/constants'


const CategoryForm = ({
    categoryId,
}) => {
    const category = DUMMY_CATEGORIES.find((category) => category.id === categoryId)

    return html`
        <form>
            <header>
                <p>CATEGORÍA</p>
                <h2>${category?.code ?? 'Nueva categoría'}</h2>
            </header>
            <div class="form__scroller">
                <fieldset columns="1">
                <inputgroup>
                    <label for="name">Nombre</label>
                    <input type="text" id="name" placeholder="Nombre de la categoría" value="${category?.name ?? ''}" />
                </inputgroup>
                <inputgroup>
                    <label for="description">Descripción (opcional)</label>
                    <textarea id="description" placeholder="Descripción de la categoría" value="${category?.description ?? ''}"></textarea>
                </inputgroup>
                <inputgroup>
                    <label for="image">Imagen</label>
                    <input type="file" id="image" name="image" accept="image/*"/>
                    <div class="InputFile__decorator">
                    <div class="InputFile__decorator__thumbnail">
                        <img loading="lazy" src="/img/icon/image-black.svg" width="24" height="24" alt="image">
                    </div>
                    <div class="InputFile__decorator__label">
                        <span>Sube una imagen</span>
                        <span>JPG, PNG o WEBP</span>
                    </div>
                    </div>
                </inputgroup>
                
                <inputgroup>
                    <label for="select">Select</label>
                    <select id="select">
                    <option disabled selected>Selecciona una opción</option>
                    <option value="1">Opción 1</option>
                    <option value="2">Opción 2</option>
                    <option value="3">Opción 3</option>
                    </select>
                </inputgroup>
                <inputgroup>
                    <label for="select-multiple__selector">Select múltiple</label>
                    <select id="select-multiple" multiple>
                    <optgroup label="Selecciona una o más opciones">
                        <option value="1">Opción 1</option>
                        <option value="2">Opción 2</option>
                        <option value="3">Opción 3</option>
                    </optgroup>
                    </select>
                    <select id="select-multiple__selector">
                    <option disabled selected>Selecciona una o más opciones</option>
                    <option value="1">Opción 1</option>
                    <option value="2">Opción 2</option>
                    <option value="3">Opción 3</option>
                    </select>
                    <inputgroup id="select-multiple__options"></inputgroup>
                </inputgroup>
                </fieldset>
            </div>
            <inputgroup>
                <button class="Button PrimaryButton PrimaryGray">
                <img src="/img/icon/trash-black.svg" width="20" height="20" alt="trash">
                </button>
                <hr>
                <button class="Button PrimaryButton PrimaryBlue" type="submit">Guardar</button>
            </inputgroup>
        </form>
    `
}

export default CategoryForm