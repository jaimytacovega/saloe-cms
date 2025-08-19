const submit = ({
    e,
    srcElement: form,
}) => {
    e.preventDefault()

    console.log('form =', form)
}

export {
    submit,
}