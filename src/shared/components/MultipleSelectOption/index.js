import { html } from 'saloe/html'


const MultipleSelectOption = ({
    id,
    label,
    value,
}) => {
    return html`
        <div class="MultipleSelectOption Button PrimaryButton PrimaryGray">
            <span>${label}</span>
            <button
                id="${id}" 
                value="${value}"
                type="button"

                on-click="MultipleSelectOptionButton.click"
            >
                <u>Eliminar</u>
                <!--
                <img loading="lazy" src="/img/icon/close-gray-1.svg" width="16" height="16" alt="remove">
                -->
            </button>
        </div>
  `
}

export default MultipleSelectOption