import { html } from 'saloe/html'

import WebGridSection from '@/features/web/components/WebGridSection'


const HomePromoGridSection = ({
    columns,
    grid,
}) => {
    return html`
        ${
            WebGridSection({
                title: html`
                    <h3>Promociones</h3>
                `,
                description: html`
                    Lorem ipsum dolor sit amet consectetur.
                `,
                grid,
                columns,
                isSticky: true,
            })
        }
    `
}

export default HomePromoGridSection