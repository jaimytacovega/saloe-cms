const click = ({
    e,
    srcElement: button,
}) => {
    e.preventDefault()

    const form = button.closest('form')
    form.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
        checkbox.checked = false
    })
}

export {
    click,
}