import { html } from 'saloe/html'

import Dialog from '@/shared/components/Dialog'
import Input from '@/shared/components/Input'

import * as BrandRepository from '@/shared/repositories/BrandRepository'
import { Source } from '@/shared/utils/constants'


const BrandDeleteDialog = async ({
    brandId,
}) => {
    const { data: brand } = brandId === 'new'
        ? { data: {} }
        : await BrandRepository.get({
            source: Source.FIREBASE,
            id: brandId,
        })

    const dialogId = `DeleteBrandDialog-${brandId}`

    return Dialog({
        id: dialogId,
        children: html`
            <form on-submit="BrandDeleteDialogForm.submit">
                <header>
                    <h2>Eliminar marca</h2>
                </header>
                ${
                    Input({
                        id: 'id',
                        value: brandId,
                        type: 'hidden',
                    })
                }
                ${
                    Input({
                        id: 'imagePath',
                        value: brand?.image?.path ?? '',
                        type: 'hidden',
                    })
                }
                <inputgroup>
                    <p>¿Estás seguro de querer eliminar esta marca? Esta acción no se puede deshacer.</p>
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

export default BrandDeleteDialog