import { html } from 'saloe/html'

import Dialog from '@/shared/components/Dialog'
import Input from '@/shared/components/Input'

import * as BannerRepository from '@/shared/repositories/BannerRepository'
import { Source } from '@/shared/utils/constants'


const BannerDeleteDialog = async ({
    bannerId,
}) => {
    const { data: banner } = bannerId === 'new'
        ? { data: {} }
        : await BannerRepository.get({
            source: Source.FIREBASE,
            id: bannerId,
        })

    const dialogId = `DeleteBannerDialog-${bannerId}`

    return Dialog({
        id: dialogId,
        children: html`
            <form on-submit="BannerDeleteDialogForm.submit">
                <header>
                    <h2>Eliminar banner</h2>
                </header>
                ${
                    Input({
                        id: 'id',
                        value: bannerId,
                        type: 'hidden',
                    })
                }
                ${
                    Input({
                        id: 'imagePath',
                        value: banner?.image?.path ?? '',
                        type: 'hidden',
                    })
                }
                <inputgroup>
                    <p>¿Estás seguro de querer eliminar este banner? Esta acción no se puede deshacer.</p>
                    <br/>
                </inputgroup>
                <inputgroup>
                    <hr/>
                    <button type="button" class="Button PrimaryButton PrimaryGray" popovertarget="${dialogId}" popovertargetaction="hide">Cancelar</button>
                    <button type="submit" class="Button PrimaryButton PrimaryBlue">Eliminar</button>
                </inputgroup>
            </form>
        `,
    })
}

export default BannerDeleteDialog
