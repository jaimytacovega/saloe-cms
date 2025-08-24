import { html } from 'saloe/html'

import Input from '@/shared/components/Input'
import Textarea from '@/shared/components/Textarea'
import Select from '@/shared/components/Select'
import InputFile from '@/shared/components/InputFile'

import NotFoundItem from '@/features/cms/components/NotFoundItem'

import * as PromotionManager from '@/shared/managers/PromotionManager'
import * as BrandManager from '@/shared/managers/BrandManager'

import { Source } from '@/shared/utils/constants'
import { lastUpdatedMessage } from '@/shared/utils/utils'


const PromotionAddOrUpdateForm = async ({
    promotionId,
}) => {
    const { data: promotion } = promotionId === 'new'
        ? { data: {} }
        : await PromotionManager.get({
            source: Source.FIREBASE,
            id: promotionId,
        })

    const { data: brands } = await BrandManager.list({
        source: Source.FIREBASE,
    })

    return Boolean(promotion)
        ? html`
            <form on-submit="Promotion${promotionId === 'new' ? 'Add' : 'Update'}Form.submit">
                <header>
                    <p>PROMOCIÓN</p>
                    <h2>${promotion?.code ?? 'Nueva promoción'}</h2>
                </header>
                <div class="form__scroller">
                    <fieldset columns="1">
                        ${
                            Input({
                                id: 'id',
                                value: promotionId,
                                type: 'hidden',
                            })
                        }
                        ${
                            Input({
                                id: 'name',
                                label: 'Nombre',
                                value: promotion?.name ?? '',
                                placeholder: 'Ingresa el nombre de la promocion',
                            })
                        }
                        ${
                            Textarea({
                                id: 'description',
                                label: 'Descripción (opcional)',
                                value: promotion?.description ?? '',
                                placeholder: 'Ingresa la descripción de la promoción',
                            })
                        }
                        ${
                            Input({
                                id: 'path',
                                value: promotion?.image?.path ?? '',
                                type: 'hidden',
                            })
                        }
                        ${
                            InputFile({
                                id: 'image',
                                label: 'Imagen',
                                src: promotion?.image?.downloadURL ?? '',
                            })
                        }
                        <!-- TODO: Categories Select -->
                        ${
                            Select({
                                id: 'brandId',
                                label: 'Marca',
                                options: (brands ?? []).map((brand) => ({
                                    value: brand.id,
                                    label: brand.name,
                                })),
                                value: promotion.brandId,
                            })
                        }
                    </fieldset>
                </div>
                <inputgroup>
                    ${
                        promotionId === 'new'
                            ? html`
                                <a href="/cms/promocions" class="Button PrimaryButton PrimaryGray">
                                    <img src="/img/icon/corner-up-left-black.svg" width="18" height="18" alt="go back">
                                </a>
                            `
                            : html`
                                <button popovertarget="DeletePromotionDialog-${promotionId}" type="button" class="Button PrimaryButton PrimaryGray">
                                    <img src="/img/icon/trash-black.svg" width="18" height="18" alt="trash">
                                </button>
                            `
                    }
                    <hr>
                    ${
                        promotionId !== 'new'
                            ? html`
                                <small>${lastUpdatedMessage({ date: promotion.updatedAt ?? promotion.createdAt })}</small>
                            `
                            : ''
                    }
                    <button class="Button PrimaryButton PrimaryBlue" type="submit">Guardar</button>
                </inputgroup>
            </form>
        `
        : NotFoundItem({
            createUrl: '/cms/promocions',
        })
}

export default PromotionAddOrUpdateForm