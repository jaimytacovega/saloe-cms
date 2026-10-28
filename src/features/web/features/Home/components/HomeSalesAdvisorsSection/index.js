import { html } from 'saloe/html'

import WebHeroSection from '@/features/web/components/WebHeroSection'

import Select from '@/shared/components/Select'

import HomeSalesAdvisorsCarrousel from '@/features/web/features/Home/components/HomeSalesAdvisorsCarrousel'

import salesAdvisorsByZone from './salesAdvisors.json'


const HomeSalesAdvisorsSection = () => {
    return html`
        ${
            WebHeroSection({
                title: html`
                    <h2>Contactate con nuestros asesores</h2>
                `,
                description: html`
                    <p>Indicanos el distrito más cerca a tu zona:</p>
                    ${
                        Select({
                            id: 'sales-advisors-district',
                            disabledOption: 'Selecciona una zona',
                            data: html`on-change="HomeSalesAdvisorsSection.change"`,
                            options: salesAdvisorsByZone.map(({ zone }) => ({
                                value: zone,
                                label: zone,
                            })),
                        })
                    }
                `,
                content: html`
                    ${
                        HomeSalesAdvisorsCarrousel({
                            zones: salesAdvisorsByZone,
                        })
                    }
                `,
                isSalesAdvisors: true,
            })
        }
    `
}

export default HomeSalesAdvisorsSection