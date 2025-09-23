import { html } from 'saloe/html'


const InputFileRemoveOption = ({
    id,
    file,
}) => {
    return html`
        <div class="InputFileRemoveOption Button PrimaryButton PrimaryGray">
            <span>${file.name}</span>
            ${
                file?.downloadURL
                    ? html`
                        <a href="${file.downloadURL}" target="_blank">
                            <u>Ver</u>
                        </a>
                    `
                    : ''
            }
            <button 
                type="button" 
                data-id="${id}"
                data-path="${file.path}"

                on-click="InputFileRemoveOptionButton.click"
            >
                <u>Eliminar</u>
            </button>
        </div>
    `
}

export default InputFileRemoveOption