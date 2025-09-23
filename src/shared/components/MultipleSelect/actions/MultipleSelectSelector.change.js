const change = ({
    e,
    srcElement: multipleSelectSelector,
}) => {
    const multipleSelect = multipleSelectSelector.previousElementSibling
    const selectedOption = e.target.value

    for (const option of multipleSelect.options) {
        if (option.value === selectedOption) {
            option.selected = true
            // Fire change event after selection
            const event = new Event('change', { bubbles: true })
            multipleSelect.dispatchEvent(event)
            break
        }
    }

    // Set the selected option in multipleSelectSelector to the disabled one
    for (const option of multipleSelectSelector.options) {
        option.selected = option.disabled
    }
}

export {
    change,
}