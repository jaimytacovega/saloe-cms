import { html } from 'saloe/html'

import WebInfoCard from '@/features/web/components/WebInfoCard'


const WebGridSection = ({
    title,
    description,
    grid,
    columns,
    isSticky = false,
}) => {
    return html`
        <container class="WebGridSection__container">
            <section 
                class="WebGridSection"
                ${isSticky ? ' sticky' : ''}
            >
                <header>
                    ${title}
                    <p>
                        ${description}
                    </p>
                </header>
                <div class="WebGridSection__grid" columns="${columns ?? 1}">
                    ${grid}
                </div>
            </section>
        </container>
    `
}

export default WebGridSection