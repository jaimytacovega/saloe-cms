import { html } from 'saloe/html'

import Input from '@/shared/components/Input'
import InputFile from '@/shared/components/InputFile'
import Textarea from '@/shared/components/Textarea'

import NotFoundItem from '@/features/cms/components/NotFoundItem'

import * as SubCategoryHook from '@/shared/hooks/SubCategoryHook'
import { Source } from '@/shared/utils/constants'
import { lastUpdatedMessage, getCMSCorrelative } from '@/shared/utils/utils'


const SubCategoryAddOrUpdateForm = async ({
    subCategoryId,
}) => {
    // const { data: subCategory } = subCategoryId === 'new'
    //     ? { data: {} }
    //     : await SubCategoryManager.get({
    //         source: Source.FIREBASE,
    //         id: subCategoryId,
    //     })

    const { data: subCategory, isCached } = subCategoryId === 'new'
        ? { data: {}, isCached: false }
        : await SubCategoryHook.useGet({
            source: Source.FIREBASE,
            id: subCategoryId,
            ttl: 10_000,
        })

    console.log('subCategory =', subCategory)
    console.log('isCached =', isCached)

    return Boolean(subCategory)
        ? html`
            <form on-submit="SubCategory${subCategoryId === 'new' ? 'Add' : 'Update'}Form.submit">
                <header>
                    <p>SUBCATEGORÍA</p>
                    ${
                        subCategoryId === 'new'
                            ? 'Nueva subcategoría'
                            : `${getCMSCorrelative({ collectionName: 'subCategories', count: subCategory.count })}`
                    }
                </header>
                <div class="form__scroller">
                    <fieldset columns="1">
                        ${
                            Input({
                                id: 'id',
                                value: subCategoryId,
                                type: 'hidden',
                            })
                        }
                        ${
                            Input({
                                id: 'name',
                                label: 'Nombre',
                                value: subCategory?.name ?? '',
                                placeholder: 'Ingresa el nombre de la subcategoría',
                            })
                        }
                        ${
                            Textarea({
                                id: 'description',
                                label: 'Descripción (opcional)',
                                value: subCategory?.description ?? '',
                                placeholder: 'Ingresa la descripción de la subcategoría',
                            })
                        }
                        ${
                            Input({
                                id: 'path',
                                value: subCategory?.image?.path ?? '',
                                type: 'hidden',
                            })
                        }
                        ${
                            InputFile({
                                id: 'image',
                                label: 'Imagen',
                                src: subCategory?.image?.downloadURL ?? '',
                            })
                        }
                        ${
                            Textarea({
                                id: 'seoKeywords',
                                label: 'Palabras clave',
                                value: subCategory?.seoKeywords ?? '',
                                placeholder: 'Ingresa las palabras clave de la subcategoría',
                            })
                        }
                    </fieldset>
                </div>
                <inputgroup>
                    ${
                        subCategoryId === 'new'
                            ? html`
                                <a href="/cms/subcategorías" class="Button PrimaryButton PrimaryGray">
                                    <img src="/img/icon/corner-up-left-black.svg" width="18" height="18" alt="go back">
                                </a>
                            `
                            : html`
                                <button popovertarget="DeleteSubCategoryDialog-${subCategoryId}" type="button" class="Button PrimaryButton PrimaryGray">
                                    <img src="/img/icon/trash-black.svg" width="18" height="18" alt="trash">
                                </button>
                            `
                    }
                    <hr>
                    ${
                        subCategoryId !== 'new'
                            ? html`
                                <small>${lastUpdatedMessage({ date: subCategory.updatedAt ?? subCategory.createdAt })}</small>
                            `
                            : ''
                    }
                    <button class="Button PrimaryButton PrimaryBlue" type="submit">Guardar</button>
                </inputgroup>
            </form>
        `
        : NotFoundItem({
            header: html`
                <h5>Aun no se registran datos</h5>
                <p>Crea nuevos registros y gestionalos desde esta sección</p>
            `,
            createUrl: '/cms/subcategorias',
        })
}

export default SubCategoryAddOrUpdateForm