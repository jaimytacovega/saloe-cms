import { html } from 'saloe/html'

import Input from '@/shared/components/Input'
import InputFile from '@/shared/components/InputFile'

import NotFoundItem from '@/features/cms/components/NotFoundItem'

import * as BrandRepository from '@/shared/repositories/BrandRepository'
import { Source } from '@/shared/utils/constants'
import { lastUpdatedMessage } from '@/shared/utils/utils'


const BrandAddOrUpdateForm = async ({
    brandId,
}) => {
    const { data: brand } = brandId === 'new'
        ? { data: {} }
        : await BrandRepository.get({
            source: Source.FIREBASE,
            id: brandId,
        })

    return Boolean(brand)
        ? html`
            <form on-submit="${brandId === 'new' ? 'Add' : 'Update'}BrandForm.submit">
                <header>
                    <p>MARCA</p>
                    <h2>${brand?.code ?? 'Nueva marca'}</h2>
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
                                id: 'path',
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
                                <a href="/cms/categorias" class="Button PrimaryButton PrimaryGray">
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
            createUrl: '/cms/categorias',
        })
}

export default BrandAddOrUpdateForm