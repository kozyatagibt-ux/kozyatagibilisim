// JSON-LD schema üreticileri
const SITE_URL = 'https://kozyatagibilisim.com';

const ORG = {
    '@type': 'Organization',
    name: 'Kozyatağı Bilişim',
    url: SITE_URL,
    logo: SITE_URL + '/favicon.svg',
    telephone: '+90 541 636 77 75',
    email: 'destek@kozyatagibilisim.com',
    address: {
        '@type': 'PostalAddress',
        streetAddress: 'Quick Tower, İçerenköy E-5 Yanyolu, Umut Sk. No:8',
        addressLocality: 'Ataşehir',
        addressRegion: 'İstanbul',
        postalCode: '34752',
        addressCountry: 'TR',
    },
    sameAs: [
        'https://www.instagram.com/kozyatagibilisim',
        'https://www.linkedin.com/company/kozyatagibilisim',
        'https://g.co/kgs/kozyatagibilisim',
    ],
    openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
    },
    foundingDate: '2024',
    numberOfEmployees: { '@type': 'QuantitativeValue', minValue: 2, maxValue: 10 },
};

export function organizationSchema() {
    return { '@context': 'https://schema.org', ...ORG };
}

export function localBusinessSchema(area = 'İstanbul') {
    return {
        '@context': 'https://schema.org',
        ...ORG,
        '@type': 'LocalBusiness',
        additionalType: 'https://schema.org/ProfessionalService',
        areaServed: {
            '@type': 'City',
            name: area === 'İstanbul' ? 'İstanbul' : `${area}, İstanbul`,
        },
        priceRange: '₺₺',
        currenciesAccepted: 'TRY',
        paymentAccepted: 'Banka Havalesi, Kredi Kartı',
        hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Kurumsal IT Hizmetleri',
            itemListElement: [
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Sunucu Kurulumu ve Sanallaştırma' } },
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Firewall ve Ağ Güvenliği' } },
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Network Kurulumu' } },
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Veri Yedekleme' } },
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'IT Destek ve Helpdesk' } },
            ],
        },
    };
}

export function articleSchema({ title, description, url, datePublished, image }) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: title,
        description,
        author: { '@type': 'Organization', name: 'Kozyatağı Bilişim' },
        publisher: ORG,
        mainEntityOfPage: url,
        datePublished: datePublished || '2026-01-01',
        ...(image ? { image } : {}),
    };
}

export function faqSchema(items) {
    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: items.map((it) => ({
            '@type': 'Question',
            name: it.q,
            acceptedAnswer: { '@type': 'Answer', text: typeof it.a === 'string' ? it.a : '' },
        })),
    };
}

export function serviceSchema({ name, description, url }) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name,
        description,
        provider: ORG,
        areaServed: 'İstanbul',
        url,
    };
}

export function breadcrumbSchema(items) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((it, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: it.label,
            item: it.href ? SITE_URL + it.href : undefined,
        })),
    };
}
