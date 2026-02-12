import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords }) => {
    const siteTitle = "Kozyatağı Bilişim | Kurumsal IT Danışmanlık ve Yönetim";
    const defaultDescription = "100+ kişilik ekiplerin IT altyapısını uçtan uca kuran, yöneten ve güvenliğini sağlayan tek muhatap. Sunucu, Network, Firewall ve Bulut çözümleri.";
    const defaultKeywords = "IT danışmanlık, kurumsal bilişim, sunucu yönetimi, siber güvenlik, network kurulumu, kozyatağı bilişim, sistem destek";

    return (
        <Helmet>
            <title>{title ? `${title} | Kozyatağı Bilişim` : siteTitle}</title>
            <meta name="description" content={description || defaultDescription} />
            <meta name="keywords" content={keywords || defaultKeywords} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:title" content={title || siteTitle} />
            <meta property="og:description" content={description || defaultDescription} />
            <meta property="og:site_name" content="Kozyatağı Bilişim" />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title || siteTitle} />
            <meta name="twitter:description" content={description || defaultDescription} />

            <meta name="robots" content="index, follow" />
            <meta name="language" content="Turkish" />
            <link rel="canonical" href="https://kozyatagibilisim.com" />
        </Helmet>
    );
};

export default SEO;
