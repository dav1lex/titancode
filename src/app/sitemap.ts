import { MetadataRoute } from 'next';
import { i18n } from '../../i18n-config';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = 'https://titancode.pl';

  const routes = [
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

  return routes;
}