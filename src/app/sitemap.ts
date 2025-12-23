import { MetadataRoute } from 'next';
import { getSortedPostsData } from '../lib/blog';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = 'https://www.titancode.pl';

  const routes = [
    '',
    '/about',
    '/services',
    '/portfolio',
    '/contact',
    '/calculate-estimate',
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

  const blogPosts = getSortedPostsData().map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date || new Date()),
  }));

  return [...staticRoutes, blogIndex, ...blogPosts];
}