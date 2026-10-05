const page = async ({
    request,
}) => {
    const url = new URL(request.url)
    const redirectUrl = new URL('/cms/marcas', request.url)
    redirectUrl.search = url.search

    return { response: Response.redirect(redirectUrl) }
}

export default page
