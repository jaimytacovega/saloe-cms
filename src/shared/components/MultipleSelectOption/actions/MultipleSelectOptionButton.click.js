const click = ({
    e,
    srcElement,
}) => {
    e.preventDefault()
    
    const multipleSelectOptionButton = srcElement.closest('button')
    const multipleSelectOption = multipleSelectOptionButton.parentNode
    const multipleSelect = multipleSelectOption.parentNode.parentNode.querySelector('select[multiple]')
    const option = [...multipleSelect.options].find((option) => option.value === multipleSelectOptionButton.value)

    option.selected = false
    multipleSelectOption.remove()
}

export {
    click,
}