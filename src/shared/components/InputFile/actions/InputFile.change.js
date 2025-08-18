const change = ({
    e,
    srcElement: input,
}) => {
    e.preventDefault()

    const file = e.target.files[0]

    if (file) {
        const decorator = input.parentNode.querySelector('.InputFile__decorator')
        const decoratorImage = decorator.querySelector('img')

        const reader = new FileReader()
        reader.onload = (e) => {
            decorator.setAttribute('loaded', 'true')
            decoratorImage.src = e.target.result
        }
        reader.readAsDataURL(file)
    }
}

export {
    change,
}