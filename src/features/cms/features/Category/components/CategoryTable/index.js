import { html } from 'saloe/html'

import Table from '@/shared/components/Table'

import { DUMMY_CATEGORIES } from '@/features/cms/features/Category/utils/constants'


const CategoryTableRow = ({
    id,
    name,
    code,
    createdAt,
    updatedAt,
    toggled,
}) => {
    return html`
        <a href="/categorias/${id}" class="Row" ${toggled ? 'toggled' : ''}>
            <span>${name}</span>
            <span>${code}</span>
            <span>${updatedAt ?? createdAt}</span>
        </a>
    `
}

const CategoryTable = () => {
    return html`
        ${
            Table({
                rows: DUMMY_CATEGORIES.map((category, idx) => CategoryTableRow({
                    id: category.id,
                    name: category.name,
                    code: category.code,
                    createdAt: category.createdAt,
                    updatedAt: category.updatedAt,
                    toggled: idx === 0,
                })),
            })
        }
    `
}

export default CategoryTable