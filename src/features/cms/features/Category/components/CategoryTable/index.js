import { html } from 'saloe/html'

import Table from '@/shared/components/Table'

import * as CategoryRepository from '@/shared/repositories/CategoryRepository'
import { Source } from '@/shared/utils/constants'
import { Operators } from '@/shared/services/DatabaseService'


const CategoryTableRow = ({
    id,
    name,
    code,
    createdAt,
    updatedAt,
    toggled,
}) => {
    return html`
        <a href="/cms/categorias/${id}" class="Row" ${toggled ? 'toggled' : ''}>
            <span>${name}</span>
            <span>${code}</span>
            <span>${updatedAt ?? createdAt}</span>
        </a>
    `
}

const CategoryTable = async ({
    searchParams,
}) => {
    const search = searchParams?.get('search')
    const filters = search
        ? [
            {
                field: 'keywords',
                operator: Operators.Contains,
                value: search,
            }
        ]
        : []

    const { data: categories } = await CategoryRepository.list({
        source: Source.FIREBASE,
        pageSize: 20,
        filters,
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
                createUrl: '/cms/categorias/crear',
            })
        }
    `
}

export default CategoryTable