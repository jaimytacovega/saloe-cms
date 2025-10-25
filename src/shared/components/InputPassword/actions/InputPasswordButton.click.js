const click = ({
    e,
    srcElement: button,
}) => {
    e.preventDefault()

    const input = button.parentNode.querySelector('input[password]')

    button.setAttribute('open', !(button.getAttribute('open') === 'true'))
    input.type = input.type === 'password' ? 'text' : 'password'
}

export {
    click,
}