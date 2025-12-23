import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/search'], // allow indexing all localized pages; keep search out of index
    },
    sitemap: 'https://www.titancode.pl/sitemap.xml',
  };
}