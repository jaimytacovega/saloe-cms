import { html } from 'saloe/html'

import CategoryTable from '@/features/cms/features/Category/components/CategoryTable'
import CategoryForm from '@/features/cms/features/Category/components/CategoryForm'

import WorkStation from '@/shared/components/WorkStation'


const CategoryWorkStation = async ({
    categoryId,
}) => {
    return html`
        ${
            WorkStation({
                header: html`
                    <h1>Categorías</h1>
                `,
                toolbox: html`
                    <form>
                        <inputgroup>
                            <img loading="lazy" src="/img/icon/search-black.svg" width="16" height="16" alt="search">
                            <input type="search" placeholder="Buscar"/>
                        </inputgroup>
                        <inputgroup>
                            <button class="Button PrimaryButton PrimaryGray">Filtrar</button>
                            <button class="Button PrimaryButton PrimaryGray">Ir a</button>
                            <button class="Button PrimaryButton PrimaryGray">Ordenar</button>
                            <hr>
                            <button class="Button PrimaryButton PrimaryBlue">Crear</button>
                        </inputgroup>
                    </form>
                `,
                table: html`
                    ${
                        await CategoryTable()
                    }
                `,
                form: Boolean(categoryId)
                    ? html`
                        ${
                            await CategoryForm({
                                categoryId,
                            })
                        }
                    ` 
                    : '',
            })
        }
    `
}

export default CategoryWorkStation