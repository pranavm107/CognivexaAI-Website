import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords, ogImage, canonicalUrl }) => {
    const siteTitle = "CognivexaAI";
    const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
    const defaultDescription = "Engineering high-performance software and AI-powered systems for the future.";
    const metaDescription = description || defaultDescription;
    const siteUrl = "https://cognivexa.ai";
    const currentUrl = canonicalUrl || siteUrl;
    const previewImage = ogImage || `${siteUrl}/og-image.png`;

    return (
        <Helmet>
            <title>{fullTitle}</title>
            <meta name="description" content={metaDescription} />
            {keywords && <meta name="keywords" content={keywords} />}
            <link rel="canonical" href={currentUrl} />

            {/* Open Graph */}
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={metaDescription} />
            <meta property="og:url" content={currentUrl} />
            <meta property="og:image" content={previewImage} />
            <meta property="og:type" content="website" />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={metaDescription} />
            <meta name="twitter:image" content={previewImage} />
        </Helmet>
    );
};

export default SEO;
