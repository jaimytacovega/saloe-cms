import { html } from 'saloe/html'


const HomeSalesAdvisorsCarrouselItem = ({
    zone,
    name,
    businessHours,
    phone,
}) => {
    const whatsappHref = phone
        ? `https://api.whatsapp.com/send?phone=51${phone}`
        : ''

    return html`
        <figure data-zone="${zone}" hidden>
            <img loading="lazy" src="/img/sales-advisors/${name}.webp" width="108" height="108" alt="${name}">
            <figcaption>
                <h6>Asesor</h6>
                <p>${name}</p>
            </figcaption>
            <figcaption>
                <h6>Horario de atención</h6>
                <p>${businessHours}</p>
            </figcaption>
            ${
                whatsappHref
                    ? html`
                        <figcaption>
                            <a class="Button PrimaryButton PrimaryBlue" href="${whatsappHref}" target="_blank" rel="noopener noreferrer">
                                <span>
                                    Ir a Whatsapp
                                </span>
                            </a>
                        </figcaption>
                    `
                    : ''
            }
        </figure>
    `
}

const HomeSalesAdvisorsCarrousel = ({
    zones = [],
}) => {
    return html`
        <div class="HomeSalesAdvisorsCarrousel">
            ${
                zones.map(({ zone, advisors }) => {
                    return advisors.map((advisor) => {
                        return HomeSalesAdvisorsCarrouselItem({
                            zone,
                            name: advisor.name,
                            businessHours: advisor.businessHours,
                            phone: advisor.phone,
                        })
                    }).join('')
                }).join('')
            }
        </div>
    `
}

export default HomeSalesAdvisorsCarrousel
