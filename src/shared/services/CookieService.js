const getCookieStore = () => {
    if (!self.cookieStore) return null
    return cookieStore
}

const set = ({
    key,
    value,
    config,
}) => {
    return getCookieStore()?.set(key, value, config)
}

const remove = ({
    key,
}) => {
    return getCookieStore()?.delete(key)
}

const get = ({
    key,
    cookies,
}) => {
    const cookieStore = getCookieStore()
    if (!cookieStore && cookies) return cookies.match(new RegExp(`${key}=([^;]+)`)).at(1)
    return cookieStore?.get(key)
}

export {
    set,
    remove,
    get,
}