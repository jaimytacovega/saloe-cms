import { html } from 'saloe/html'

import Input from '@/shared/components/Input'
import InputFile from '@/shared/components/InputFile'
import Textarea from '@/shared/components/Textarea'
import MultipleSelect from '@/shared/components/MultipleSelect'

import NotFoundItem from '@/features/cms/components/NotFoundItem'

import * as ProductHook from '@/shared/hooks/ProductHook'
import * as SubCategoryHook from '@/shared/hooks/SubCategoryHook'
import * as BrandHook from '@/shared/hooks/BrandHook'
import { Source } from '@/shared/utils/constants'
import { lastUpdatedMessage, getCMSCorrelative } from '@/shared/utils/utils'


const ProductAddOrUpdateForm = async ({
    productId,
}) => {
    // const { data: product, isCached } = productId === 'new'
    //     ? { data: {}, isCached: false }
    //     : await ProductHook.useGet({
    //         source: Source.FIREBASE,
    //         id: productId,
    //         ttl: 10_000,
    //     })

    const [
        productGetResult,
        subCategoryListResult,
        brandListResult,
    ] = await Promise.allSettled([
        productId === 'new'
            ? { data: {}, isCached: false }
            : await ProductHook.useGet({
                source: Source.FIREBASE,
                id: productId,
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
    ])

    // TODO: Make error page
    if (
        productGetResult.status === 'rejected' || 
        subCategoryListResult.status === 'rejected' ||
        brandListResult.status === 'rejected'
    ) return html`error`

    const { data: product, isCached } = productGetResult.value
    const { data: subCategories } = subCategoryListResult.value
    const { data: brands } = brandListResult.value

    console.log('product =', product)
    console.log('isCached =', isCached)

    return Boolean(product)
        ? html`
            <form on-submit="Product${productId === 'new' ? 'Add' : 'Update'}Form.submit">
                <header>
                    <p>PRODUCTO</p>
                    <h2>
                        ${
                            productId === 'new'
                                ? 'Nuevo producto'
                                : `${getCMSCorrelative({ collectionName: 'products', count: product.count })}`
                        }
                    </h2>
                </header>
                <div class="form__scroller">
                    <fieldset columns="1">
                        ${
                            Input({
                                id: 'id',
                                value: productId,
                                type: 'hidden',
                            })
                        }
                        ${
                            Input({
                                id: 'name',
                                label: 'Nombre',
                                value: product?.name ?? '',
                                placeholder: 'Ingresa el nombre de la producto',
                            })
                        }
                        ${
                            Textarea({
                                id: 'description',
                                label: 'Descripción (opcional)',
                                value: product?.description ?? '',
                                placeholder: 'Ingresa la descripción del producto',
                            })
                        }
                        ${
                            Input({
                                id: 'path',
                                value: product?.image?.path ?? '',
                                type: 'hidden',
                            })
                        }
                        ${
                            InputFile({
                                id: 'image',
                                label: 'Imagen',
                                src: product?.image?.downloadURL ?? '',
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
                                selectedOptions: (product?.subCategoryIds ?? []).reduce((acc, subCategoryId) => {
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
                                selectedOptions: (product?.brandIds ?? []).reduce((acc, brandId) => {
                                    acc[brandId] = true
                                    return acc
                                }, {}),
                            })
                        }
                        ${
                            Input({
                                id: 'technicalSheetPath',
                                value: product?.technicalSheet?.path ?? '',
                                type: 'hidden',
                            })
                        }
                        ${
                            InputFile({
                                id: 'technicalSheet',
                                label: 'Ficha técnica (opcional)',
                                src: product?.technicalSheet?.downloadURL ?? '',
                                type: 'file',
                                accept: 'application/pdf',
                                acceptLabel: 'PDF',
                                showUploadedFiles: true,
                                files: Boolean(product?.technicalSheet?.path)
                                    ? [{
                                        name: product?.technicalSheet?.path.split('/').at(-1) ?? '',
                                        ...product?.technicalSheet,
                                    }] 
                                    : [],
                            })
                        }
                    </fieldset>
                </div>
                <inputgroup>
                    ${
                        productId === 'new'
                            ? html`
                                <a href="/cms/productos" class="Button PrimaryButton PrimaryGray">
                                    <img src="/img/icon/corner-up-left-black.svg" width="18" height="18" alt="go back">
                                </a>
                            `
                            : html`
                                <button popovertarget="DeleteProductDialog-${productId}" type="button" class="Button PrimaryButton PrimaryGray">
                                    <img src="/img/icon/trash-black.svg" width="18" height="18" alt="trash">
                                </button>
                            `
                    }
                    <hr>
                    ${
                        productId !== 'new'
                            ? html`
                                <small>${lastUpdatedMessage({ date: product.updatedAt ?? product.createdAt })}</small>
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
            createUrl: '/cms/productos',
        })
}

export default ProductAddOrUpdateForm