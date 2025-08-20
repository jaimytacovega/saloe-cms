const prettifyError = ({ error }) => {
    return error.issues[0].message
}

export {
    prettifyError,
}