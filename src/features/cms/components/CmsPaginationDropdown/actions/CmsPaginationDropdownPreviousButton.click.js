const pageFromInput = ({
    input,
}) => {
    const pageNumber = Number(input.value)
    if (!Number.isFinite(pageNumber) || pageNumber < 1) return 1
    return Math.floor(pageNumber)
}

const click = ({
    e,
    srcElement: button,
}) => {
    e.preventDefault()

    const input = button.closest('form').querySelector('[name="page"]')
    input.value = Math.max(1, pageFromInput({ input }) - 1)
}

export {
    click,
}
