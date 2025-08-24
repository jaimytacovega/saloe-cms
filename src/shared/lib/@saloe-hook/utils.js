const NAVIGATE_STATE = {
    Reload: 'reload',
    Navigate: 'navigate',
    BackForward: 'back-forward',
    Prerender: 'prerender',
}

const getNavigateState = () => {
    const [navEntry] = performance.getEntriesByType('navigation')
    return navEntry.type
}

export {
    NAVIGATE_STATE,
    getNavigateState,
}