import { NextRequest, NextResponse } from 'next/server';
import { i18n } from '../i18n-config';

function getLocale(request: NextRequest): string {
  // Simple locale detection without Negotiator for edge runtime compatibility
  const acceptLanguage = request.headers.get('accept-language');
  const browserLocales = acceptLanguage
    ? acceptLanguage.split(',').map(lang => lang.split(';')[0].trim().toLowerCase())
    : [];
  
  const supportedLocales = [...i18n.locales] as string[];
  
  // Find first matching locale
  for (const browserLocale of browserLocales) {
    // Check exact match
    if (supportedLocales.includes(browserLocale)) {
      return browserLocale;
    }
    // Check language part match (e.g., 'en' from 'en-US')
    const langPart = browserLocale.split('-')[0];
    const match = supportedLocales.find(locale => locale.startsWith(langPart));
    if (match) {
      return match;
    }
  }
  
  return i18n.defaultLocale;
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // // `/_next/` and `/api/` are ignored by the watcher, but we need to ignore files in `public`
  // Check if the pathname is for the blog
  if (pathname.startsWith('/blog')) {
    return NextResponse.next();
  }

  if (
    [
      '/manifest.json',
      '/favicon.ico',
      // Your other files in `public`
    ].includes(pathname)
  )
    return;

  // Check if there is any supported locale in the pathname
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale: string) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);

    // e.g. incoming request is /products
    // The new URL is now /en-US/products
    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`,
        request.url
      )
    );
  }
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ['/((?!api|blog|_next/static|_next/image|sitemap.xml|robots.txt|favicon.ico).*)'],
};