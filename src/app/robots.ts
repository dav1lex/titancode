import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/search', '/en'], // Disallow crawling English pages
    },
    sitemap: 'https://www.titancode.pl/sitemap.xml',
  };
}