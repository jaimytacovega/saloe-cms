const change = ({
    srcElement,
}) => {
    const zone = srcElement.value
    const section = srcElement.closest('.WebHeroSection')
    const figures = section?.querySelectorAll('.HomeSalesAdvisorsCarrousel > figure') ?? []

    figures.forEach((figure) => {
        if (figure.getAttribute('data-zone') === zone) figure.removeAttribute('hidden')
        else figure.setAttribute('hidden', '')
    })
}

export {
    change,
}
