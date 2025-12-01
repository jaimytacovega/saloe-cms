import { useQuery } from '@/shared/lib/@saloe-hook'

import * as Category_SubCategoryManager from '@/shared/managers/Category_SubCategoryManager'
import { ListCategory_SubCategoryArraySchema } from '@/shared/schemas/Category_SubCategorySchema'
import { listArgumentsToQueryString } from '@/shared/services/DatabaseService'


const useList = ({
    source,
    filters,
    sorters,
    pageSize,
    ttl,
}) => {
    return useQuery({
        queryKey: ['category_subCategory', 'list', source, listArgumentsToQueryString({ filters, sorters, pageSize })],
        queryGroup: ['category_subCategory', 'list', source],
        queryFn: () => Category_SubCategoryManager.list({ source, filters, sorters, pageSize }),
        querySchema: ListCategory_SubCategoryArraySchema,
        ttl,
    })
}

export {
    useList,
}