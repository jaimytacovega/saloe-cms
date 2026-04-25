const click = ({
    e,
    srcElement,
}) => {
    e.preventDefault()

    const navigateToSectionId = srcElement.getAttribute('data-navigate-to') ?? ''
    const navigateToSection = document.getElementById(navigateToSectionId)
    navigateToSection?.scrollIntoView({ behavior: 'smooth' })
}

export {
    click,
}