import { html } from 'saloe/html'

import Input from '@/shared/components/Input'
import InputFile from '@/shared/components/InputFile'

import NotFoundItem from '@/features/cms/components/NotFoundItem'

import * as BrandHook from '@/shared/hooks/BrandHook'
import { Source } from '@/shared/utils/constants'
import { lastUpdatedMessage, getCMSCorrelative } from '@/shared/utils/utils'


const BrandAddOrUpdateForm = async ({
    brandId,
    listUrl,
    searchParams,
}) => {
    const { data: brand, isCached } = brandId === 'new'
        ? { data: {}, isCached: false }
        : await BrandHook.useGet({
            source: Source.FIREBASE,
            id: brandId,
            ttl: 10_000,
        })

    console.log('brand =', brand)
    console.log('isCached =', isCached)

    return Boolean(brand)
        ? html`
            <form on-submit="Brand${brandId === 'new' ? 'Add' : 'Update'}Form.submit">
                <header>
                    <p>MARCA</p>
                    <h2>
                        ${
                            brandId === 'new'
                                ? 'Nueva marca'
                                : `${getCMSCorrelative({ collectionName: 'brands', count: brand.count })}`
                        }
                    </h2>
                </header>
                <div class="form__scroller">
                    <fieldset columns="1">
                        ${
                            Input({
                                id: 'id',
                                value: brandId,
                                type: 'hidden',
                            })
                        }
                        ${
                            Input({
                                id: 'name',
                                label: 'Nombre',
                                value: brand?.name ?? '',
                                placeholder: 'Ingresa el nombre de la marca',
                            })
                        }
                        ${
                            Input({
                                id: 'imagePath',
                                value: brand?.image?.path ?? '',
                                type: 'hidden',
                            })
                        }
                        ${
                            InputFile({
                                id: 'image',
                                label: 'Imagen',
                                src: brand?.image?.downloadURL ?? '',
                            })
                        }
                    </fieldset>
                </div>
                <inputgroup>
                    ${
                        brandId === 'new'
                            ? html`
                                <a href="${listUrl}?${searchParams?.toString()}" class="Button PrimaryButton PrimaryGray">
                                    <img src="/img/icon/corner-up-left-black.svg" width="18" height="18" alt="go back">
                                </a>
                            `
                            : html`
                                <button popovertarget="DeleteBrandDialog-${brandId}" type="button" class="Button PrimaryButton PrimaryGray">
                                    <img src="/img/icon/trash-black.svg" width="18" height="18" alt="trash">
                                </button>
                            `
                    }
                    <hr>
                    ${
                        brandId !== 'new'
                            ? html`
                                <small>${lastUpdatedMessage({ date: brand.updatedAt ?? brand.createdAt })}</small>
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
            createUrl: '/cms/marcas',
        })
}

export default BrandAddOrUpdateForm