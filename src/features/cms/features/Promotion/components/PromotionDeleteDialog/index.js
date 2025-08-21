import { html } from 'saloe/html'

import Dialog from '@/shared/components/Dialog'
import Input from '@/shared/components/Input'

import * as PromotionRepository from '@/shared/repositories/PromotionRepository'
import { Source } from '@/shared/utils/constants'


const PromotionDeleteDialog = async ({
    promotionId,
}) => {
    const { data: promotion } = promotionId === 'new'
        ? { data: {} }
        : await PromotionRepository.get({
            source: Source.FIREBASE,
            id: promotionId,
        })

    const dialogId = `DeletePromotionDialog-${promotionId}`

    return Dialog({
        id: dialogId,
        children: html`
            <form on-submit="PromotionDeleteDialogForm.submit">
                <header>
                    <h2>Eliminar promocion</h2>
                </header>
                ${
                    Input({
                        id: 'id',
                        value: promotionId,
                        type: 'hidden',
                    })
                }
                ${
                    Input({
                        id: 'path',
                        value: promotion?.image?.path ?? '',
                        type: 'hidden',
                    })
                }
                <inputgroup>
                    <p>¿Estás seguro de querer eliminar esta promocion? Esta acción no se puede deshacer.</p>
                    <br/>
                </inputgroup>
                <inputgroup>
                    <hr/>
                    <button type="button" class="Button PrimaryButton PrimaryGray" popovertarget="${dialogId}" popovertargetaction="hide">Cancelar</button>
                    <button type="submit" class="Button PrimaryButton PrimaryBlue">Eliminar</button>
                </inputgroup>
            </form>
        `
    })
}

export default PromotionDeleteDialog