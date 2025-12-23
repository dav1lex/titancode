import { NextRequest, NextResponse } from 'next/server';
import { i18n } from '../i18n-config';

/**
 * SEO-safe locale routing:
 * - No Accept-Language based redirects (stable URLs for Google).
 * - If locale is missing, permanently redirect to default locale (/pl).
 * - Set a header so the root layout can set <html lang> correctly.
 */
export function proxy(request: NextRequest) {
  const { pathname, hostname, protocol, search } = request.nextUrl;
  const canonicalHostname = 'www.titancode.pl';

  // In production, redirect to the canonical domain
  if (
    process.env.NODE_ENV === 'production' &&
    (protocol !== 'https:' || hostname !== canonicalHostname)
  ) {
    const newUrl = new URL(pathname, `https://${canonicalHostname}`);
    newUrl.search = search;
    return NextResponse.redirect(newUrl.toString(), 308);
  }

  // Handle trailing slash
  if (pathname.length > 1 && pathname.endsWith('/')) {
    const newUrl = new URL(pathname.slice(0, -1), request.url);
    newUrl.search = search;
    return NextResponse.redirect(newUrl.toString(), 308);
  }

  // Blog is non-localized
  if (pathname.startsWith('/blog')) {
    return NextResponse.next();
  }

  const hasLocalePrefix = i18n.locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  // Missing locale: always go to default locale
  if (!hasLocalePrefix) {
    const newUrl = new URL(`/${i18n.defaultLocale}${pathname}`, request.url);
    newUrl.search = search;
    return NextResponse.redirect(newUrl.toString(), 308);
  }

  // Locale present: pass through, but expose it to layouts
  const localeFromPath = pathname.split('/')[1] || i18n.defaultLocale;
  const res = NextResponse.next();
  res.headers.set('x-site-lang', localeFromPath);
  return res;
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: [
    '/((?!api|blog|images|_next/static|_next/image|sitemap.xml|robots.txt|favicon.ico|logo.svg|site.webmanifest|apple-touch-icon.png|og-image.png|twitter-image.png).*)',
  ],
};