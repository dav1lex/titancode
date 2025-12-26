import { Metadata } from 'next'

// Base configuration
export const siteConfig = {
    name: 'TitanCode',
    title: 'TitanCode - Tworzenie Stron Internetowych Warszawa',
    description: 'Profesjonalne tworzenie stron internetowych w Warszawie. Projektujemy szybkie, nowoczesne i zoptymalizowane pod SEO strony WWW dla firm.',
    url: 'https://www.titancode.pl',
    ogImage: 'https://www.titancode.pl/og-image.png',
    links: {
        twitter: 'https://twitter.com/titancode',
        linkedin: 'https://linkedin.com/company/titancode',
        github: 'https://github.com/titancode',
    },
    creator: 'TitanCode Team',
    keywords: [
        'Tworzenie stron internetowych',
        'Strony WWW Warszawa',
        'Web Development',
        'Agencja Interaktywna',
    ],
}

// Page-specific metadata
export const pageMetadata = {
    home: {
        title: 'TitanCode - Tworzenie Stron Internetowych Warszawa | Profesjonalne Strony WWW',
        description: 'Profesjonalne tworzenie stron internetowych w Warszawie. Projektujemy szybkie, nowoczesne i zoptymalizowane pod SEO strony WWW dla firm.',
        keywords: [
            'strony www warszawa',
            'tworzenie stron',
        ],
    },
    blog: {
        title: 'Blog TitanCode - Wiedza o Tworzeniu Stron i Marketingu',
        description: 'Poradniki, artykuły i wiedza ekspercka na temat tworzenia stron internetowych, SEO i marketingu online.',
    }
}

// Helper function to generate metadata
export function createMetadata(page: keyof typeof pageMetadata, customData?: Partial<Metadata>): Metadata {
    const pageData = pageMetadata[page]

    const metadata: Metadata = {
        title: pageData.title,
        description: pageData.description,
        keywords: ('keywords' in pageData ? pageData.keywords : undefined) || siteConfig.keywords,
        authors: [{ name: siteConfig.creator }],
        creator: siteConfig.creator,
        publisher: siteConfig.name,
        openGraph: {
            type: 'website',
            locale: 'pl_PL',
            url: siteConfig.url,
            title: pageData.title,
            description: pageData.description,
            siteName: siteConfig.name,
            images: [
                {
                    url: siteConfig.ogImage,
                    width: 1200,
                    height: 630,
                    alt: `${siteConfig.name} - ${pageData.title}`,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: pageData.title,
            description: pageData.description,
            images: [siteConfig.ogImage],
            creator: '@titancode',
        },
    }

    // Merge with custom data if provided
    return { ...metadata, ...customData }
}
