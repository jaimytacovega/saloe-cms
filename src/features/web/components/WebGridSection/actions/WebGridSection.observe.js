/**
 * Scroll only the horizontal `<nav>` scrollport so `button` is centered.
 * Avoids `scrollIntoView`, which can scroll the document vertically and fight the main scroller while `IntersectionObserver` runs.
 */
const scrollHorizontalNavToShowButton = (button) => {
    if (!button) return

    const nav = button.closest('nav')
    if (!nav) return

    const navRect = nav.getBoundingClientRect()
    const buttonRect = button.getBoundingClientRect()
    const delta =
        (buttonRect.left + buttonRect.width / 2)
        - (navRect.left + navRect.width / 2)
    const maxScroll = Math.max(0, nav.scrollWidth - nav.clientWidth)
    const nextLeft = Math.max(0, Math.min(nav.scrollLeft + delta, maxScroll))

    nav.scrollTo({ left: nextLeft, behavior: 'smooth' })
}

const observe = ({
    entry,
    observer,
}) => {
    if (!entry.isIntersecting) return
    
    const navigateToSectionButtonId = entry.target.getAttribute('id') ?? ''
    const navigateToSectionButton = document.querySelector(`[data-navigate-to="${navigateToSectionButtonId}"]`)
    console.log('navigateToSectionButton = ', navigateToSectionButton.innerHTML)
    const toggledNavigateToSectionButton = navigateToSectionButton?.parentNode?.querySelector('button[toggled]')
    
    toggledNavigateToSectionButton?.removeAttribute('toggled')
    navigateToSectionButton?.setAttribute('toggled', '')

    scrollHorizontalNavToShowButton(navigateToSectionButton)
}

export {
    observe,
}