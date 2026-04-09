import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://kozyatagibilisim.com';

/**
 * Per-page SEO + JSON-LD schema enjeksiyonu.
 *
 * Props:
 *  - title: sayfa başlığı (suffix otomatik eklenir)
 *  - description: meta description
 *  - canonical: tam URL veya path (path verilirse SITE_URL ile birleşir)
 *  - noindex: boolean
 *  - schema: tek bir JSON-LD object veya object array (Article, FAQPage, Service, BreadcrumbList, LocalBusiness vb.)
 *  - ogType: 'website' | 'article' (default 'website')
 */
const SEO = ({ title, description, canonical, noindex = false, schema, ogType = 'website' }) => {
    const defaultTitle = "Yönetilen IT Hizmetleri İstanbul | Kurumsal IT Desteği - Kozyatağı Bilişim";
    const defaultDescription = "İstanbul merkezli kurumsal IT desteği: sunucu yönetimi, network, firewall, yedekleme ve siber güvenlik. KOBİ ve orta ölçekli işletmeler için tek muhatap yönetilen IT hizmetleri.";
    const defaultCanonical = SITE_URL + '/';

    const finalTitle = title ? `${title} | Kozyatağı Bilişim` : defaultTitle;
    const finalDescription = description || defaultDescription;
    let finalCanonical = canonical || defaultCanonical;
    if (finalCanonical.startsWith('/')) finalCanonical = SITE_URL + finalCanonical;

    const schemas = schema ? (Array.isArray(schema) ? schema : [schema]) : [];

    return (
        <Helmet>
            <title>{finalTitle}</title>
            <meta name="description" content={finalDescription} />
            <link rel="canonical" href={finalCanonical} />
            <meta
                name="robots"
                content={noindex ? "noindex, follow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"}
            />

            <meta property="og:title" content={finalTitle} />
            <meta property="og:description" content={finalDescription} />
            <meta property="og:url" content={finalCanonical} />
            <meta property="og:type" content={ogType} />

            <meta name="twitter:title" content={finalTitle} />
            <meta name="twitter:description" content={finalDescription} />

            {schemas.map((s, i) => (
                <script key={i} type="application/ld+json">{JSON.stringify(s)}</script>
            ))}
        </Helmet>
    );
};

export default SEO;
export { SITE_URL };
