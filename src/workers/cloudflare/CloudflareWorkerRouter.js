import { addRoute, getRouter } from 'saloe/router'

import * as CmsCategoriesPage from '@/app/cms/categories/page'


const setRouter = () => {
    addRoute({ pathname: '/cms/categorias', route: CmsCategoriesPage.default })
}

export {
    setRouter,
}