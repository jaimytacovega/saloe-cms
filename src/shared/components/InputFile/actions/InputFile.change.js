import { html } from 'saloe/html'

import InputFileRemoveOption from '@/shared/components/InputFileRemoveOption'


const uploadSingleImage = ({ file, input }) => {
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

const getOldFiles = ({ input }) => {
    return JSON.parse(
        decodeURIComponent(
            input.parentNode.querySelector(`#${input.id}__oldFiles`).value ?? '{}'
        )
    )
}

const uploadMultipleFiles = ({ files, input }) => {
    const multipleFiles = [
        ...getOldFiles({ input }),
        ...files,
    ]

    const multipleFilesInputGroup = input.parentNode.querySelector(`#${input.id}__files`)
    multipleFilesInputGroup.innerHTML = ''

    multipleFilesInputGroup.insertAdjacentHTML('beforeend', html`
        ${
            multipleFiles.map((file) => html`
                ${
                    InputFileRemoveOption({
                        id: input.id,
                        file,
                    })
                }    
            `).join('')
        }    
    `)
}

const change = ({
    e,
    srcElement: input,
}) => {
    e.preventDefault()

    const isSingleImage = !input.hasAttribute('multiple') && input.accept.includes('image/*')

    if (isSingleImage) uploadSingleImage({ file: e.target.files[0], input })
    else uploadMultipleFiles({ files: e.target.files, input })
}

export {
    change,
}