import { html } from 'saloe/html'

import Input from '@/shared/components/Input'
import InputFileRemoveOption from '@/shared/components/InputFileRemoveOption'


const InputFile = ({
    id,
    label,
    accept,
    alt,
    uploadLabel,
    acceptLabel,
    src,
    multiple = false,
    type = 'image',
    files,
    showUploadedFiles = false,
}) => {
    const showThumbnail = Boolean(src) && !Boolean(files)

    return html`
        <inputgroup>
            <label for="${id}">${label}</label>
            <input type="file" id="${id}" accept="${accept ?? 'image/*'}" on-change="InputFile.change" ${multiple ? 'multiple' : ''}/>
            <div class="InputFile__decorator" loaded=${showThumbnail}>
                <div class="InputFile__decorator__figure">
                    <img 
                        loading="lazy" 
                        width="24" 
                        height="24" 
                        alt="${alt ?? type}"
                        src="${showThumbnail ? src : `/img/icon/${type}-black.svg`}" 
                    >
                </div>
                <div class="InputFile__decorator__label">
                    <span>${uploadLabel ?? 'Sube un archivo'}</span>
                    <span>${acceptLabel ?? 'JPG, PNG o WEBP'}</span>
                </div>
            </div>
            ${
                multiple || showUploadedFiles
                    ? html`
                        <inputgroup id="${id}__files">
                            ${
                                (files ?? []).map((file) => html`
                                    ${
                                        InputFileRemoveOption({
                                            id,
                                            file,
                                        })
                                    }
                                `).join('')
                            }
                        </inputgroup>
                        ${
                            Input({
                                id: `${id}__oldFiles`,
                                type: 'hidden',
                                value: encodeURIComponent(JSON.stringify(files ?? [])),
                            })
                        }
                        ${
                            Input({
                                id: `${id}__filesToRemove`,
                                type: 'hidden',
                                value: '{}',
                            })
                        }
                    `
                    : ''
            }
        </inputgroup>
    `
}

export default InputFile