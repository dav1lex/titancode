import { MetadataRoute } from 'next';
import { i18n } from '../../i18n-config';
import { getSortedPostsData } from '../lib/blog';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = 'https://titancode.pl';

  const staticRoutes = [
    '',
    '/about',
    '/services',
    '/portfolio',
    '/contact',
    '/calculate-estimate',
  ].flatMap((route) =>
    i18n.locales.map((locale) => ({
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