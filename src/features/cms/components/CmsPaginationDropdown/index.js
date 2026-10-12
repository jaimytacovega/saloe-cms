import { html } from 'saloe/html'

import { searchParamsToListArguments } from '@/shared/services/DatabaseService'
import { DEFAULT_PAGE } from '@/shared/utils/constants'

import Dropdown from '@/shared/components/Dropdown'


const currentPage = ({
    searchParams,
}) => {
    const listArguments = searchParamsToListArguments({ searchParams })
    const pageNumber = Number(listArguments.page)
    if (!Number.isFinite(pageNumber) || pageNumber < 1) return DEFAULT_PAGE
    return Math.floor(pageNumber)
}

const CmsPaginationDropdown = ({
    searchParams,
}) => {
    const id = 'pagination'
    const page = currentPage({ searchParams })

    return Dropdown({
        id,
        trigger: html`
            <button class="Button PrimaryButton PrimaryGray" type="button" popovertarget="${id}">Ir a</button>
        `,
        content: html`
            <form class="CmsPaginationDropdown" on-submit="CmsPaginationDropdownForm.submit">
                <inputgroup>
                    <h6>Ir a página:</h6>
                </inputgroup>
                <inputgroup class="CmsPaginationDropdown__stepper">
                    <button
                        class="Button PrimaryButton PrimaryGray"
                        type="button"
                        on-click="CmsPaginationDropdownPreviousButton.click"
                    >Ant.</button>
                    <input
                        name="page"
                        type="number"
                        min="1"
                        step="1"
                        inputmode="numeric"
                        value="${page}"
                        required
                    />
                    <button
                        class="Button PrimaryButton PrimaryGray"
                        type="button"
                        on-click="CmsPaginationDropdownNextButton.click"
                    >Sig.</button>
                </inputgroup>
                <inputgroup>
                    <button
                        class="Button PrimaryButton PrimaryBlack"
                        type="submit"
                        full-width
                        content-center
                    >Aplicar</button>
                </inputgroup>
            </form>
        `
    })
}

export default CmsPaginationDropdown
