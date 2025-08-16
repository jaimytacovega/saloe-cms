// Add some basic interactivity
document.addEventListener('DOMContentLoaded', () => {
  const ctaButton = document.getElementById('ctaButton')
  
  if (ctaButton) {
    ctaButton.addEventListener('click', () => {
      alert('Hello from Saloe CMS! 🚀')
    })
  }
  
  console.log('Saloe CMS is running!')
}) 

// Select multiple
const multipleSelectId = 'select-multiple'
const multipleSelect = document.getElementById(multipleSelectId)
const multipleSelectSelector = document.getElementById(`${multipleSelectId}__selector`)
const multipleSelectOptions = document.getElementById(`${multipleSelectId}__options`)

multipleSelectSelector?.addEventListener('change', (e) => {
  const selectedOption = e.target.value

  for (const option of multipleSelect.options) {
    if (option.value === selectedOption) {
      option.selected = true
      // Fire change event after selection
      const event = new Event('change', { bubbles: true });
      multipleSelect.dispatchEvent(event);
      break;
    }
  }

  // Set the selected option in multipleSelectSelector to the disabled one
  for (const option of multipleSelectSelector.options) {
    option.selected = option.disabled;
  }
})

multipleSelect?.addEventListener('change', (e) => {
  Array.from(multipleSelect.selectedOptions).forEach((opt) => {
    console.log('multipleSelect changed:', opt);

    const { value, textContent, selected } = opt
    const optionId = `option-${value}`
    const optionButton = document.getElementById(optionId)

    if (optionButton) return

    const optionButtonHtml = `
      <button class="Button PrimaryButton PrimaryGray" id="${optionId}" value="${value}" type="button">
        <span>${textContent}</span>
        <img loading="lazy" src="/img/icon/close-gray-1.svg" width="16" height="16" alt="remove">
      </button>
    `

    multipleSelectOptions?.insertAdjacentHTML('beforeend', optionButtonHtml)

    const insertedOptionButton = document.getElementById(optionId)
    console.log('insertedOptionButton =', insertedOptionButton)

    insertedOptionButton?.addEventListener('click', () => {
      opt.selected = false
      insertedOptionButton?.remove()
    })
  })
})
