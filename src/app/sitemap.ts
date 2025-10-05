import { MetadataRoute } from 'next';
import { getSortedPostsData } from '../lib/blog';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = 'https://www.titancode.pl';

  const staticRoutes = [
    '',
    '/about',
    '/services',
    '/portfolio',
    '/contact',
    '/calculate-estimate',
  ].flatMap((route) =>
    ['pl'].map((locale) => ({
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