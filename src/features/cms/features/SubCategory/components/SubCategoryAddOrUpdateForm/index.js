import { html } from 'saloe/html'

import Input from '@/shared/components/Input'
import InputFile from '@/shared/components/InputFile'
import Textarea from '@/shared/components/Textarea'
import MultipleSelect from '@/shared/components/MultipleSelect'

import NotFoundItem from '@/features/cms/components/NotFoundItem'

import * as SubCategoryHook from '@/shared/hooks/SubCategoryHook'
import * as CategoryHook from '@/shared/hooks/CategoryHook'
import { Source } from '@/shared/utils/constants'
import { lastUpdatedMessage, getCMSCorrelative } from '@/shared/utils/utils'


const SubCategoryAddOrUpdateForm = async ({
    subCategoryId,
    listUrl,
    searchParams,
}) => {
    const [
        subCategoryGetResult,
        categoryListResult,
    ] = await Promise.allSettled([
        subCategoryId === 'new'
            ? { data: {}, isCached: false }
            : await SubCategoryHook.useGet({
                source: Source.FIREBASE,
                id: subCategoryId,
                ttl: 10_000,
            })
        ,
        CategoryHook.useList({
            source: Source.FIREBASE,
            ttl: 10_000,
        })
    ])

    // TODO: Make error page
    if (
        subCategoryGetResult.status === 'rejected' || 
        categoryListResult.status === 'rejected'
    ) return html`error`

    const { data: subCategory } = subCategoryGetResult.value
    const { data: categories } = categoryListResult.value

    const correlative = getCMSCorrelative({ collectionName: 'subCategories', count: subCategory?.count ?? '' })

    return Boolean(subCategory)
        ? html`
            <form on-submit="SubCategory${subCategoryId === 'new' ? 'Add' : 'Update'}Form.submit">
                <header>
                    <h6>SUBCATEGORÍA</h6>
                    <h2>
                        ${
                            subCategoryId === 'new'
                                ? 'Nueva subcategoría'
                                : correlative
                        }      
                    </h2>
                    ${
                        subCategoryId !== 'new'
                            ? html`
                                <a href="/subcategoria/${subCategoryId}" target="_blank" class="Button PrimaryButton PrimaryGray">
                                    <span>Ir a</span>
                                    <img src="/img/icon/arrow-up-right-gray-1.svg" width="16" height="16" alt="go to subcategory">
                                </a>
                            `:
                            ''
                    }
                </header>
                <div class="form__scroller">
                    <fieldset columns="1">
                        ${
                            subCategoryId === 'new'
                                ? ''
                                : Input({
                                    id: 'id',
                                    value: subCategoryId,
                                    type: 'hidden',
                                })
                        }
                        ${
                            subCategoryId === 'new'
                                ? ''
                                : Input({
                                    id: 'correlative',
                                    value: correlative,
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
                                id: 'imagePath',
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
                            MultipleSelect({
                                id: 'categoryIds',
                                label: 'Categorías',
                                options: (categories ?? []).map((category) => ({
                                    value: category.id,
                                    label: `${getCMSCorrelative({ collectionName: 'categories', count: category.count })}: ${category.name}`,
                                })),
                                selectedOptions: (subCategory?.categoryIds ?? []).reduce((acc, categoryId) => {
                                    acc[categoryId] = true
                                    return acc
                                }, {}),
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
                    <a href="${listUrl}?${searchParams?.toString()}" class="Button PrimaryButton PrimaryGray">
                        <img src="/img/icon/corner-up-left-black.svg" width="18" height="18" alt="go back">
                    </a>
                    ${
                        subCategoryId === 'new'
                            ? ''
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