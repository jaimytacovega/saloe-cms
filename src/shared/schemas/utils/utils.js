const prettifyError = ({ error }) => {
    return error.issues[0].message
}

/**
 * Normalizes user input into a URL path segment safe for `/productos/:slug`.
 * Lowercase ASCII, digits, single hyphens; strips accents (á → a); ñ → n.
 * Returns `undefined` when empty after cleaning.
 */
const slugifySeoSlug = (raw) => {
    if (raw == null) return undefined
    const s = String(raw).trim()
    if (!s) return undefined
    const slug = s
        .replace(/ñ/g, 'n')
        .replace(/Ñ/g, 'N')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '')
    return slug === '' ? undefined : slug
}

export {
    prettifyError,
    slugifySeoSlug,
}