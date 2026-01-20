import { addRoute } from 'saloe/router'

import * as CmsBrandsPage from '@/app/cms/marcas/page'
import * as CmsBrandsCreatePage from '@/app/cms/marcas/crear/page'
import * as CmsBrandsByIdPage from '@/app/cms/marcas/[id]'  

import * as CmsPromotionsPage from '@/app/cms/promociones/page'
import * as CmsPromotionsCreatePage from '@/app/cms/promociones/crear/page'
import * as CmsPromotionsByIdPage from '@/app/cms/promociones/[id]'

import * as CmsSubCategoriesPage from '@/app/cms/subcategorias/page'
import * as CmsSubCategoriesCreatePage from '@/app/cms/subcategorias/crear/page'
import * as CmsSubCategoriesByIdPage from '@/app/cms/subcategorias/[id]'

import * as CmsCategoriesPage from '@/app/cms/categorias/page'
import * as CmsCategoriesCreatePage from '@/app/cms/categorias/crear/page'
import * as CmsCategoriesByIdPage from '@/app/cms/categorias/[id]'

import * as CmsProductsPage from '@/app/cms/productos/page'
import * as CmsProductsCreatePage from '@/app/cms/productos/crear/page'
import * as CmsProductsByIdPage from '@/app/cms/productos/[id]'

import * as CmsQuotationsPage from '@/app/cms/cotizaciones/page'
import * as CmsQuotationsCreatePage from '@/app/cms/cotizaciones/crear/page'
import * as CmsQuotationsByIdPage from '@/app/cms/cotizaciones/[id]'

import * as Category_SubCategoryListPage from '@/app/api/Category_SubCategory/list/page'
import * as BrandListPage from '@/app/api/Brand/list/page'

import * as AuthLoginPage from '@/app/auth/login/page'

import * as HomeWebPage from '@/app/page'
import * as SubCategoryWebPage from '@/app/subcategoria/[id]'
import * as ProductWebPage from '@/app/productos/[id]'
import * as SearchWebPage from '@/app/search/page'


const setRouter = () => {
    addRoute({ pathname: '/cms/marcas', route: CmsBrandsPage.default })
    addRoute({ pathname: '/cms/marcas/crear', route: CmsBrandsCreatePage.default })
    addRoute({ pathname: '/cms/marcas/:id', route: CmsBrandsByIdPage.default }) 

    addRoute({ pathname: '/cms/promociones', route: CmsPromotionsPage.default })
    addRoute({ pathname: '/cms/promociones/crear', route: CmsPromotionsCreatePage.default })
    addRoute({ pathname: '/cms/promociones/:id', route: CmsPromotionsByIdPage.default })

    addRoute({ pathname: '/cms/subcategorias', route: CmsSubCategoriesPage.default })
    addRoute({ pathname: '/cms/subcategorias/crear', route: CmsSubCategoriesCreatePage.default })
    addRoute({ pathname: '/cms/subcategorias/:id', route: CmsSubCategoriesByIdPage.default })

    addRoute({ pathname: '/cms/categorias', route: CmsCategoriesPage.default })
    addRoute({ pathname: '/cms/categorias/crear', route: CmsCategoriesCreatePage.default })
    addRoute({ pathname: '/cms/categorias/:id', route: CmsCategoriesByIdPage.default })

    addRoute({ pathname: '/cms/productos', route: CmsProductsPage.default })
    addRoute({ pathname: '/cms/productos/crear', route: CmsProductsCreatePage.default })
    addRoute({ pathname: '/cms/productos/:id', route: CmsProductsByIdPage.default })

    addRoute({ pathname: '/cms/cotizaciones', route: CmsQuotationsPage.default })
    addRoute({ pathname: '/cms/cotizaciones/crear', route: CmsQuotationsCreatePage.default })
    addRoute({ pathname: '/cms/cotizaciones/:id', route: CmsQuotationsByIdPage.default })

    addRoute({ pathname: '/api/category_subCategory/list', route: Category_SubCategoryListPage.default })
    addRoute({ pathname: '/api/brand/list', route: BrandListPage.default })

    addRoute({ pathname: '/auth/login', route: AuthLoginPage.default })

    addRoute({ pathname: '/', route: HomeWebPage.default })
    addRoute({ pathname: '/subcategoria/:id', route: SubCategoryWebPage.default })
    addRoute({ pathname: '/productos/:id', route: ProductWebPage.default })
    addRoute({ pathname: '/search', route: SearchWebPage.default })
}

export {
    setRouter,
}