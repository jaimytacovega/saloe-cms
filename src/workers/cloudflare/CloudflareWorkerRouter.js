import { addRoute } from 'saloe/router'

import * as CmsCategoriesPage from '@/app/cms/categories/page'
import * as CmsCategoriesCreatePage from '@/app/cms/categories/crear/page'
import * as CmsCategoriesByIdPage from '@/app/cms/categories/[id]'

import * as CmsBrandsPage from '@/app/cms/marcas/page'
import * as CmsBrandsCreatePage from '@/app/cms/marcas/crear/page'


const setRouter = () => {
    addRoute({ pathname: '/cms/categorias', route: CmsCategoriesPage.default })
    addRoute({ pathname: '/cms/categorias/crear', route: CmsCategoriesCreatePage.default })
    addRoute({ pathname: '/cms/categorias/:id', route: CmsCategoriesByIdPage.default })

    addRoute({ pathname: '/cms/marcas', route: CmsBrandsPage.default })
    addRoute({ pathname: '/cms/marcas/crear', route: CmsBrandsCreatePage.default })
}

export {
    setRouter,
}