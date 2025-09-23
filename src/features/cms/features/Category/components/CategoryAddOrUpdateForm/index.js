import { html } from 'saloe/html'

import Input from '@/shared/components/Input'
import InputFile from '@/shared/components/InputFile'
import Textarea from '@/shared/components/Textarea'
import MultipleSelect from '@/shared/components/MultipleSelect'

import NotFoundItem from '@/features/cms/components/NotFoundItem'

import * as CategoryHook from '@/shared/hooks/CategoryHook'
import * as SubCategoryHook from '@/shared/hooks/SubCategoryHook'
import * as BrandHook from '@/shared/hooks/BrandHook'
import * as PromotionHook from '@/shared/hooks/PromotionHook'
import { Source } from '@/shared/utils/constants'
import { lastUpdatedMessage, getCMSCorrelative } from '@/shared/utils/utils'


const CategoryAddOrUpdateForm = async ({
    categoryId,
}) => {
    const [
        categoryGetResult, 
        subCategoryListResult,
        brandListResult,
        promotionListResult,
    ] = await Promise.allSettled([
        categoryId === 'new'
            ? { data: {}, isCached: false }
            : await CategoryHook.useGet({
                source: Source.FIREBASE,
                id: categoryId,
                ttl: 10_000,
            })
        ,
        SubCategoryHook.useList({
            source: Source.FIREBASE,
            ttl: 10_000,
        }),
        BrandHook.useList({
            source: Source.FIREBASE,
            ttl: 10_000,
        }),
        PromotionHook.useList({
            source: Source.FIREBASE,
            ttl: 10_000,
        }),
    ])

    // TODO: Make error page
    if (
        categoryGetResult.status === 'rejected' || 
        subCategoryListResult.status === 'rejected' ||
        brandListResult.status === 'rejected' ||
        promotionListResult.status === 'rejected'
    ) return html`error`

    const { data: category, isCached } = categoryGetResult.value
    const { data: subCategories } = subCategoryListResult.value
    const { data: brands } = brandListResult.value
    const { data: promotions } = promotionListResult.value

    console.log('category =', category)
    console.log('isCached =', isCached)

    return Boolean(category)
        ? html`
            <form on-submit="Category${categoryId === 'new' ? 'Add' : 'Update'}Form.submit">
                <header>
                    <p>CATEGORÍA</p>
                    <h2>
                        ${
                            categoryId === 'new'
                                ? 'Nueva categoría'
                                : `${getCMSCorrelative({ collectionName: 'categories', count: category.count })}`
                        }
                    </h2>
                </header>
                <div class="form__scroller">
                    <fieldset columns="1">
                        ${
                            Input({
                                id: 'id',
                                value: categoryId,
                                type: 'hidden',
                            })
                        }
                        ${
                            Input({
                                id: 'name',
                                label: 'Nombre',
                                value: category?.name ?? '',
                                placeholder: 'Ingresa el nombre de la categoría',
                            })
                        }
                        ${
                            Textarea({
                                id: 'description',
                                label: 'Descripción (opcional)',
                                value: category?.description ?? '',
                                placeholder: 'Ingresa la descripción de la categoría',
                            })
                        }
                        ${
                            Input({
                                id: 'path',
                                value: category?.image?.path ?? '',
                                type: 'hidden',
                            })
                        }
                        ${
                            InputFile({
                                id: 'image',
                                label: 'Imagen',
                                src: category?.image?.downloadURL ?? '',
                            })
                        }
                        ${
                            MultipleSelect({
                                id: 'subCategoryIds',
                                label: 'Subcategorías',
                                options: (subCategories ?? []).map((subCategory) => ({
                                    value: subCategory.id,
                                    label: `${getCMSCorrelative({ collectionName: 'subCategories', count: subCategory.count })}: ${subCategory.name}`,
                                })),
                                selectedOptions: (category?.subCategoryIds ?? []).reduce((acc, subCategoryId) => {
                                    acc[subCategoryId] = true
                                    return acc
                                }, {}),
                            })
                        }
                        ${
                            MultipleSelect({
                                id: 'brandIds',
                                label: 'Marcas',
                                options: (brands ?? []).map((brand) => ({
                                    value: brand.id,
                                    label: `${getCMSCorrelative({ collectionName: 'brands', count: brand.count })}: ${brand.name}`,
                                })),
                                selectedOptions: (category?.brandIds ?? []).reduce((acc, brandId) => {
                                    acc[brandId] = true
                                    return acc
                                }, {}),
                            })
                        }
                        ${
                            MultipleSelect({
                                id: 'promotionIds',
                                label: 'Promociones',
                                options: (promotions ?? []).map((promotion) => ({
                                    value: promotion.id,
                                    label: `${getCMSCorrelative({ collectionName: 'promotions', count: promotion.count })}: ${promotion.name}`,
                                })),
                                selectedOptions: (category?.promotionIds ?? []).reduce((acc, promotionId) => {
                                    acc[promotionId] = true
                                    return acc
                                }, {}),
                            })
                        }
                        ${
                            InputFile({
                                id: 'catalogs',
                                label: 'Catálogos',
                                type: 'file',
                                accept: 'application/pdf',
                                acceptLabel: 'PDF',
                                multiple: true,
                                files: (category?.catalogs ?? []).map((catalog) => {
                                    const name = catalog.path.split('/').at(-1)
                                    return {
                                        ...catalog,
                                        name,
                                    }
                                }),
                            })
                        }
                    </fieldset>
                </div>
                <inputgroup>
                    ${
                        categoryId === 'new'
                            ? html`
                                <a href="/cms/categorías" class="Button PrimaryButton PrimaryGray">
                                    <img src="/img/icon/corner-up-left-black.svg" width="18" height="18" alt="go back">
                                </a>
                            `
                            : html`
                                <button popovertarget="DeleteCategoryDialog-${categoryId}" type="button" class="Button PrimaryButton PrimaryGray">
                                    <img src="/img/icon/trash-black.svg" width="18" height="18" alt="trash">
                                </button>
                            `
                    }
                    <hr>
                    ${
                        categoryId !== 'new'
                            ? html`
                                <small>${lastUpdatedMessage({ date: category.updatedAt ?? category.createdAt })}</small>
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
            createUrl: '/cms/categorías',
        })
}

export default CategoryAddOrUpdateForm