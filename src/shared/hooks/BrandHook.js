import * as BrandManager from '@/shared/managers/BrandManager'
import { useQuery } from '@/shared/lib/@saloe-hook'
import { listArgumentsToQueryString } from '@/shared/services/DatabaseService'
import { ListBrandArraySchema } from '@/shared/schemas/BrandSchema'


const useList = ({
    source,
    filters,
    sorters,
    pageSize,
    ttl,
}) => {
    return useQuery({
        queryKey: ['brand', 'list', source, listArgumentsToQueryString({ filters, sorters, pageSize })],
        queryFn: () => BrandManager.list({ source, filters, sorters, pageSize }),
        querySchema: ListBrandArraySchema,
        ttl,
    })
}

export {
    useList,
}