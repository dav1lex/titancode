import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/search', // Disallow crawling of the search page
    },
    sitemap: 'https://titancode.pl/sitemap.xml',
  };
}