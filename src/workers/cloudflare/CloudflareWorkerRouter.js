import { addRoute } from 'saloe/router'

import * as CmsCategoriesPage from '@/app/cms/categories/page'
import * as CmsCategoriesCreatePage from '@/app/cms/categories/crear/page'
import * as CmsCategoriesByIdPage from '@/app/cms/categories/[id]'

import * as CmsBrandsPage from '@/app/cms/marcas/page'
import * as CmsBrandsCreatePage from '@/app/cms/marcas/crear/page'
import * as CmsBrandsByIdPage from '@/app/cms/marcas/[id]'  

import * as CmsPromotionsPage from '@/app/cms/promociones/page'
import * as CmsPromotionsCreatePage from '@/app/cms/promociones/crear/page'
import * as CmsPromotionsByIdPage from '@/app/cms/promociones/[id]'


const setRouter = () => {
    addRoute({ pathname: '/cms/categorias', route: CmsCategoriesPage.default })
    addRoute({ pathname: '/cms/categorias/crear', route: CmsCategoriesCreatePage.default })
    addRoute({ pathname: '/cms/categorias/:id', route: CmsCategoriesByIdPage.default })

    addRoute({ pathname: '/cms/marcas', route: CmsBrandsPage.default })
    addRoute({ pathname: '/cms/marcas/crear', route: CmsBrandsCreatePage.default })
    addRoute({ pathname: '/cms/marcas/:id', route: CmsBrandsByIdPage.default }) 

    addRoute({ pathname: '/cms/promociones', route: CmsPromotionsPage.default })
    addRoute({ pathname: '/cms/promociones/crear', route: CmsPromotionsCreatePage.default })
    addRoute({ pathname: '/cms/promociones/:id', route: CmsPromotionsByIdPage.default })
}

export {
    setRouter,
}