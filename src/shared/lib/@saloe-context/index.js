import { isWindow } from 'saloe/util'


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

const initContext = () => {
    if (!isWindow()) return

    const env = document.body.getAttribute('data-env') ?? ''
    const request = new Request(location.href)
    
    setContext({ key: 'env', value: env })
    setContext({ key: 'request', value: request })
}

initContext()

export {
    getContext,
    setContext,
    removeContext,
}