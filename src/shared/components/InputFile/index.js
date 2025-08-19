import { html } from 'saloe/html'


const InputFile = ({
    id,
    label,
    accept,
    alt,
    uploadLabel,
    acceptLabel,
    src,
}) => {
    return html`
        <inputgroup>
            <label for="${id}">${label}</label>
            <input type="file" id="${id}" accept="${accept ?? 'image/*'}" on-change="InputFile.change"/>
            <div class="InputFile__decorator" loaded=${Boolean(src)}>
                <div class="InputFile__decorator__thumbnail">
                    <img loading="lazy" src="${Boolean(src) ? src : '/img/icon/image-black.svg'}" width="24" height="24" alt="${alt ?? 'image'}">
                </div>
                <div class="InputFile__decorator__label">
                    <span>${uploadLabel ?? 'Sube una imagen'}</span>
                    <span>${acceptLabel ?? 'JPG, PNG o WEBP'}</span>
                </div>
            </div>
        </inputgroup>
    `
}

export default InputFile