import * as BrandHook from '@/shared/hooks/BrandHook'

import { Source } from '@/shared/utils/constants'
import { queryBySearchParams } from '@/shared/services/DatabaseService'


const page = async ({
    request,
    env,
    cookies,
}) => {
    const { searchParams } = new URL(request?.url)

    const { data: category_subCategories } = await queryBySearchParams({
        query: ({ listArguments }) => {
            return BrandHook.useList({
                source: Source.FIREBASE,
                ...listArguments,
                ttl: 60_000,
            })
        },
        searchParams,
    })

    const response = new Response(
        JSON.stringify(category_subCategories), 
        {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        },
    )

    return { response}
}

export default page