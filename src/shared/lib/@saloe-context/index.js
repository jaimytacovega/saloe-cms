const CONTEXT = new Map()

const getContext = ({ key }) => {
    return CONTEXT.get(key)
}

const setContext = ({ key, value }) => {
    CONTEXT.set(key, value)
}

const removeContext = ({ key }) => {
    CONTEXT.delete(key)
}

export {
    getContext,
    setContext,
    removeContext,
}