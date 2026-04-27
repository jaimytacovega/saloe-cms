import { html } from 'saloe/html'

import Input from '@/shared/components/Input'
import Textarea from '@/shared/components/Textarea'
import InputFile from '@/shared/components/InputFile'

import NotFoundItem from '@/features/cms/components/NotFoundItem'

import * as BannerHook from '@/shared/hooks/BannerHook'

import { Source } from '@/shared/utils/constants'
import { lastUpdatedMessage, getCMSCorrelative } from '@/shared/utils/utils'


const BannerAddOrUpdateForm = async ({
    bannerId,
    listUrl,
    searchParams,
}) => {
    const [bannerGetResult] = await Promise.allSettled([
        bannerId === 'new'
            ? new Promise((resolve) => resolve({ data: {}, isCached: false }))
            : BannerHook.useGet({
                source: Source.FIREBASE,
                id: bannerId,
                ttl: 10_000,
            }),
    ])

    if (bannerGetResult.status === 'rejected') return html`error`

    const { data: banner } = bannerGetResult.value

    const correlative = getCMSCorrelative({ collectionName: 'banners', count: banner?.count ?? '' })

    return Boolean(banner)
        ? html`
            <form on-submit="Banner${bannerId === 'new' ? 'Add' : 'Update'}Form.submit">
                <header>
                    <h6>BANNER</h6>
                    <h2>
                        ${
                            bannerId === 'new'
                                ? 'Nuevo banner'
                                : correlative
                        }
                    </h2>
                </header>
                <div class="form__scroller">
                    <fieldset columns="1">
                        ${
                            bannerId === 'new'
                                ? ''
                                : Input({
                                    id: 'id',
                                    value: bannerId,
                                    type: 'hidden',
                                })
                        }
                        ${
                            bannerId === 'new'
                                ? ''
                                : Input({
                                    id: 'correlative',
                                    value: correlative,
                                    type: 'hidden',
                                })
                        }
                        ${
                            Input({
                                id: 'pretitle',
                                label: 'Antetítulo (opcional)',
                                value: banner?.pretitle ?? '',
                                placeholder: 'Texto sobre el título',
                            })
                        }
                        ${
                            Input({
                                id: 'title',
                                label: 'Título',
                                value: banner?.title ?? '',
                                placeholder: 'Título del banner',
                            })
                        }
                        ${
                            Textarea({
                                id: 'description',
                                label: 'Descripción (opcional)',
                                value: banner?.description ?? '',
                                placeholder: 'Descripción del banner',
                            })
                        }
                        ${
                            Input({
                                id: 'imagePath',
                                value: banner?.image?.path ?? '',
                                type: 'hidden',
                            })
                        }
                        ${
                            InputFile({
                                id: 'image',
                                label: 'Imagen',
                                src: banner?.image?.downloadURL ?? '',
                            })
                        }
                        ${
                            Input({
                                id: 'isPublished',
                                label: 'Publicar este banner',
                                value: '',
                                type: 'checkbox',
                                checked: banner?.isPublished ?? false,
                                reverse: true,
                            })
                        }
                    </fieldset>
                </div>
                <inputgroup>
                    <a href="${listUrl}?${searchParams?.toString()}" class="Button PrimaryButton PrimaryGray">
                        <img src="/img/icon/corner-up-left-black.svg" width="18" height="18" alt="go back">
                    </a>
                    ${
                        bannerId === 'new'
                            ? ''
                            : html`
                                <button popovertarget="DeleteBannerDialog-${bannerId}" type="button" class="Button PrimaryButton PrimaryGray">
                                    <img src="/img/icon/trash-black.svg" width="18" height="18" alt="trash">
                                </button>
                            `
                    }
                    <hr>
                    ${
                        bannerId !== 'new'
                            ? html`
                                <small>${lastUpdatedMessage({ date: banner.updatedAt ?? banner.createdAt })}</small>
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
            createUrl: '/cms/banners',
        })
}

export default BannerAddOrUpdateForm
