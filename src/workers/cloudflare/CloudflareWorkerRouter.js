import { addRoute, getRouter } from 'saloe/router'

import * as CmsCategoriesPage from '@/app/cms/categories/page'
import * as CmsCategoriesCreatePage from '@/app/cms/categories/crear/page'
import * as CmsCategoriesByIdPage from '@/app/cms/categories/[id]'


const setRouter = () => {
    addRoute({ pathname: '/cms/categorias', route: CmsCategoriesPage.default })
    addRoute({ pathname: '/cms/categorias/crear', route: CmsCategoriesCreatePage.default })
    addRoute({ pathname: '/cms/categorias/:id', route: CmsCategoriesByIdPage.default })
}

export {
    setRouter,
}