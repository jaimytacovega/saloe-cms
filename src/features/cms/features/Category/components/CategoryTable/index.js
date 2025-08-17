import { html } from 'saloe/html'

import Table from '@/shared/components/Table'

// import { DUMMY_CATEGORIES } from '@/features/cms/features/Category/utils/constants'
import * as CategoryRepository from '@/shared/repositories/CategoryRepository'
import { Source } from '@/shared/utils/constants'

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

const CategoryTable = async () => {
    const { data: categories } = await CategoryRepository.list({
        source: Source.FIREBASE,
        pageSize: 20,
    })

    return html`
        ${
            Table({
                rows: categories.map((category, idx) => CategoryTableRow({
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