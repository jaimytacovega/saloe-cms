import { html } from 'saloe/html'

import MultipleSelectOption from '@/shared/components/MultipleSelectOption'


const change = ({
    e,
    srcElement: multipleSelect,
}) => {
    const multipleSelectId = multipleSelect.id
    const multipleSelectOptions = document.getElementById(`${multipleSelectId}__options`)

    Array.from(multipleSelect.selectedOptions).forEach((opt) => {
        const { value, textContent } = opt
        const optionId = `${multipleSelectId}-option-${value}`
        const optionButton = document.getElementById(optionId)

        if (optionButton) return

        const optionButtonHtml = html`
            ${
                MultipleSelectOption({
                    id: optionId,
                    label: textContent,
                    value,
                })
            }
        `

        multipleSelectOptions?.insertAdjacentHTML('beforeend', optionButtonHtml)
    })
}

export {
    change,
}