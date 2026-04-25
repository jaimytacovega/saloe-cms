import { html } from 'saloe/html'

import Input from '@/shared/components/Input'
import Textarea from '@/shared/components/Textarea'
import Select from '@/shared/components/Select'
import InputFile from '@/shared/components/InputFile'

import NotFoundItem from '@/features/cms/components/NotFoundItem'

import * as PromotionHook from '@/shared/hooks/PromotionHook'
import * as BrandHook from '@/shared/hooks/BrandHook'

import { Source } from '@/shared/utils/constants'
import { lastUpdatedMessage, getCMSCorrelative } from '@/shared/utils/utils'


const PromotionAddOrUpdateForm = async ({
    promotionId,
    listUrl,
    searchParams,
}) => {
    const [promotionGetResult, brandListResult] = await Promise.allSettled([
        promotionId === 'new'
            ? new Promise((resolve) => resolve({ data: {}, isCached: false }))
            : PromotionHook.useGet({
                source: Source.FIREBASE,
                id: promotionId,
                ttl: 10_000,
            })
        ,
        BrandHook.useList({
            source: Source.FIREBASE,
            ttl: 10_000,
        }),
    ])

    // TODO: Make error page
    if (
        promotionGetResult.status === 'rejected' || 
        brandListResult.status === 'rejected'
    ) return html`error`

    const { data: promotion } = promotionGetResult.value
    const { data: brands } = brandListResult.value

    const correlative = getCMSCorrelative({ collectionName: 'promotions', count: promotion?.count ?? '' })

    return Boolean(promotion)
        ? html`
            <form on-submit="Promotion${promotionId === 'new' ? 'Add' : 'Update'}Form.submit">
                <header>
                    <h6>PROMOCIÓN</h6>
                    <h2>
                        ${
                            promotionId === 'new'
                                ? 'Nueva promoción'
                                : correlative
                        }
                    </h2>
                </header>
                <div class="form__scroller">
                    <fieldset columns="1">
                        ${
                            promotionId === 'new'
                                ? ''
                                : Input({
                                    id: 'id',
                                    value: promotionId,
                                    type: 'hidden',
                                })
                        }
                        ${
                            promotionId === 'new'
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
                                id: 'reward',
                                label: 'Recompensa (opcional)',
                                value: promotion?.reward ?? '',
                                placeholder: 'Ej. beneficio o detalle de la recompensa',
                            })
                        }
                        ${
                            Input({
                                id: 'imagePath',
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
                    <a href="${listUrl}?${searchParams?.toString()}" class="Button PrimaryButton PrimaryGray">
                        <img src="/img/icon/corner-up-left-black.svg" width="18" height="18" alt="go back">
                    </a>
                    ${
                        promotionId === 'new'
                            ? ''
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
            header: html`
                <h5>Aun no se registran datos</h5>
                <p>Crea nuevos registros y gestionalos desde esta sección</p>
            `,
            createUrl: '/cms/promociones',
        })
}

export default PromotionAddOrUpdateForm