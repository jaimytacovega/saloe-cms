import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, DEFAULT_SORTERS } from '@/shared/utils/constants'


const redirectIfMissingSearchParams = ({ request,searchParams }) => {
    if (
        !searchParams.get('page') || 
        !searchParams.get('pageSize') ||
        !searchParams.get('sort')
    ) {
        const redirectUrl = new URL(request.url)
        redirectUrl.searchParams.set('page', DEFAULT_PAGE)
        redirectUrl.searchParams.set('pageSize', DEFAULT_PAGE_SIZE)
        redirectUrl.searchParams.set('sort', DEFAULT_SORTERS)
        
        return { response: Response.redirect(redirectUrl.toString()) }
    }

    return { response: null }
}

export {
    redirectIfMissingSearchParams,
}