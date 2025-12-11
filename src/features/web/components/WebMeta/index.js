import { html } from 'saloe/html'


const WebMeta = ({
    title = '',
    description = '',
    schema = '{}',
    image = '',
    canonical = '',
    index = true,
    follow = true,
}) => {
    return html`
        <meta charset="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/vite.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <title>${title}</title>
        <meta name="description" content="${description}" />
        <meta property="og:title" content="${title}" />
        <meta property="og:description" content="${description}" />
        <meta property="og:image" content="${image}" />

        <link rel="stylesheet" href="/web-global.css">

        <link rel="stylesheet" href="/Button.css">
        <link rel="stylesheet" href="/Input.css">
        <link rel="stylesheet" href="/Form.css">
        <link rel="stylesheet" href="/Dialog.css">

        <link rel="stylesheet" href="/WebTopMenu.css">
        <link rel="stylesheet" href="/WebStickyBanner.css">
        <link rel="stylesheet" href="/WebNavigation.css">
        <link rel="stylesheet" href="/WebHeroSection.css">
        <link rel="stylesheet" href="/WebGridSection.css">
        <link rel="stylesheet" href="/WebInfoCard.css">
        <link rel="stylesheet" href="/HomeQuotationDialog.css">
        <link rel="stylesheet" href="/WebStickySection.css">
        <link rel="stylesheet" href="/WebLegalsSection.css">

        <link rel="canonical" href="${canonical}" />

        ${
            [
                'robots',
                'googlebot',
                'bingbot',
                'yandexbot',
                'duckduckbot',
                'baidubot',
                'naverbot',
                'seznambot',
                'sogoubot',
                '360bot'
            ].map(bot => html`
                <meta name="${bot}" content="${index ? 'index' : 'noindex'}, ${follow ? 'follow' : 'nofollow'}" />
            `).join('')
        }

        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
        <meta name="robots-txt" content="/robots.txt" />

        <script type="application/ld+json">${schema}</script>
    `
}

export default WebMeta