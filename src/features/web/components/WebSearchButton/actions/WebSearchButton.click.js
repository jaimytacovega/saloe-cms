const click = ({
    e,
    srcElement,
}) => {
    e.preventDefault()

    const button = srcElement.closest('button')
    const key = button.getAttribute('data-search-key')
    const param = button.getAttribute('data-search-param')

    const searchParams = new URLSearchParams(location.search)

    const values = searchParams.get(key)?.split(',') ?? []
    const isValueFiltered = values.includes(param)

    const newValues = isValueFiltered 
        ? values.filter((value) => value !== param) 
        : [...values, param]
    
    searchParams.set(key, newValues.join(','))

    location.href = `/search?${searchParams.toString()}`
}

export {
    click,
}