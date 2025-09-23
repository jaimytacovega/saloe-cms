const click = ({
    e,
    srcElement: button,
}) => {
    e.preventDefault()

    const id = button.getAttribute('data-id')
    const path = button.getAttribute('data-path')

    const filesToRemoveInput = button.parentNode.parentNode.parentNode.querySelector(`#${id}__filesToRemove`)
    const filesToRemove = JSON.parse(
        decodeURIComponent(
            filesToRemoveInput.value
        )
    )

    filesToRemove[path] = true
    filesToRemoveInput.value = encodeURIComponent(JSON.stringify(filesToRemove))

    const oldFilesInput = button.parentNode.parentNode.parentNode.querySelector(`#${id}__oldFiles`)
    const oldFiles = JSON.parse(
        decodeURIComponent(
            oldFilesInput.value
        )
    )
    
    oldFilesInput.setAttribute('value', encodeURIComponent(
            JSON.stringify(
                oldFiles.filter((file) => file.path !== path)
            )
        )
    )

    button.parentNode.remove()
}

export {
    click,
}