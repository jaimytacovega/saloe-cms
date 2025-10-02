import { html } from 'saloe/html'

import Dialog from '@/shared/components/Dialog'
import Input from '@/shared/components/Input'

import * as OrderRepository from '@/shared/repositories/OrderRepository'
import { Source } from '@/shared/utils/constants'


const OrderDeleteDialog = async ({
    orderId,
}) => {
    const { data: order } = orderId === 'new'
        ? { data: {} }
        : await OrderRepository.get({
            source: Source.FIREBASE,
            id: orderId,
        })

    const dialogId = `DeleteOrderDialog-${orderId}`

    return Dialog({
        id: dialogId,
        children: html`
            <form on-submit="OrderDeleteDialogForm.submit">
                <header>
                    <h2>Eliminar cotización</h2>
                </header>
                ${
                    Input({
                        id: 'id',
                        value: orderId,
                        type: 'hidden',
                    })
                }
                ${
                    Input({
                        id: 'attachmentPaths',
                        value: order?.attachments?.map((attachment) => attachment.path) ?? '',
                        type: 'hidden',
                    })
                }
                <inputgroup>
                    <p>¿Estás seguro de querer eliminar esta cotización? Esta acción no se puede deshacer.</p>
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

export default OrderDeleteDialog