import { html } from 'saloe/html'

import Dialog from '@/shared/components/Dialog'
import Input from '@/shared/components/Input'

import * as ProductRepository from '@/shared/repositories/ProductRepository'
import { Source } from '@/shared/utils/constants'


const ProductDeleteDialog = async ({
    productId,
}) => {
    const { data: product } = productId === 'new'
        ? { data: {} }
        : await ProductRepository.get({
            source: Source.FIREBASE,
            id: productId,
        })

    const dialogId = `DeleteProductDialog-${productId}`

    return Dialog({
        id: dialogId,
        children: html`
            <form on-submit="ProductDeleteDialogForm.submit">
                <header>
                    <h2>Eliminar producto</h2>
                </header>
                ${
                    Input({
                        id: 'id',
                        value: productId,
                        type: 'hidden',
                    })
                }
                ${
                    Input({
                        id: 'imagePath',
                        value: product?.image?.path ?? '',
                        type: 'hidden',
                    })
                }
                ${
                    Input({
                        id: 'technicalSheetPath',
                        value: product?.technicalSheet?.path ?? '',
                        type: 'hidden',
                    })
                }
                <inputgroup>
                    <p>¿Estás seguro de querer eliminar esta producto? Esta acción no se puede deshacer.</p>
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

export default ProductDeleteDialog