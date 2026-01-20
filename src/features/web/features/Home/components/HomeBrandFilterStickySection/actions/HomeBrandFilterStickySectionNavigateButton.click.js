const click = ({
    e,
    srcElement,
}) => {
    e.preventDefault()

    const navigateToId = srcElement.getAttribute('data-navigate-to') ?? ''
    const stickyContainer = document.getElementById(navigateToId)
    const stickySection = stickyContainer?.querySelector('.WebStickySection')

    if (!stickyContainer || !stickySection) return

    stickySection.setAttribute('sticky', '')
    stickyContainer.scrollIntoView({ behavior: 'smooth' })
}

export {
    click,
}