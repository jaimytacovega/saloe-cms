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

        // const optionButtonHtml = html`
        //   <div 
        //     class="Button PrimaryButton PrimaryGray"  
        // >
        //     <span>${textContent}</span>
        //     <button
        //         id="${optionId}" 
        //         value="${value}"
        //         type="button"

        //         on-click="MultipleSelectOptionButton.click"
        //     >
        //       <img loading="lazy" src="/img/icon/close-gray-1.svg" width="16" height="16" alt="remove">
        //     </button>
        //   </div>
        // `

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