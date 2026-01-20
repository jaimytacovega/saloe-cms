import { html } from 'saloe/html'


const WebSearchButton = ({
    key,
    param,
    isSelected = false,
    children,
}) => {
    return html`
        <button
            data-search-key="${key}"
            data-search-param="${param}"
            ${isSelected ? 'selected' : ''}

            on-click="WebSearchButton.click"
        >
            ${children}
        </button>
    `
}

export default WebSearchButton