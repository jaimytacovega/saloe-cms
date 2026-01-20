const click = ({
    e,
    srcElement,
}) => {
    e.preventDefault()

    const stickyContainer = srcElement.closest('.WebStickySection__container')
    const stickySection = srcElement.closest('.WebStickySection')
    if (!stickyContainer || !stickySection) return

    stickyContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.scrollBy({ top: 68, behavior: 'smooth' });
    stickySection.removeAttribute('sticky')
}

export {
    click,
}