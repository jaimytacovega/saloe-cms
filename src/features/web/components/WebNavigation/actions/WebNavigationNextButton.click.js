const click = ({
    e,
    srcElement,
}) => {
    e.preventDefault()

    const nav = srcElement?.closest?.('.WebNavigation')
    const toggledNavigateToSectionButton = nav?.querySelector?.('button[toggled]')

    const nextNavigateToSectionButton = Boolean(toggledNavigateToSectionButton)
        ? toggledNavigateToSectionButton?.nextElementSibling
        : nav?.querySelector?.('button[data-navigate-to]')
        
    if (!nextNavigateToSectionButton) return

    nextNavigateToSectionButton?.click()
}

export {
    click,
}