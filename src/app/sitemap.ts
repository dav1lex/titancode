import { MetadataRoute } from 'next';
import { getBlogPosts } from '../lib/blog';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = 'https://www.titancode.pl';

  const routes = [
    '',
    '/about',
    '/services',
    '/portfolio',
    '/contact',
    '/calculate-estimate',

    // Landing pages (SEO)
    '/strony-internetowe-warszawa',
    '/landing-page-dla-kursu-online',
    '/panel-administracyjny-na-zamowienie',
  ];

  const staticRoutes = routes.flatMap((route) =>
    ['pl', 'en'].map((locale) => ({
      url: `${siteUrl}/${locale}${route}`,
      lastModified: new Date(),
    }))
  );

  const blogIndex = {
    url: `${siteUrl}/blog`,
    lastModified: new Date(),
  };

  const blogPosts = getBlogPosts().map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date || new Date()),
  }));

  return [...staticRoutes, blogIndex, ...blogPosts];
}