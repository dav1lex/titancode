import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProviders } from "./theme-providers";
import { cookies, headers } from "next/headers";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { LanguageProvider } from "./language-context";
import { getLocaleFromLang } from "@/lib/locale-utils";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.titancode.pl'),
  title: {
    default: 'TITANCODE - Next-Generation Development Platform',
    template: `%s | TITANCODE`,
  },
  description: 'We craft premium web solutions that blend cutting-edge technology with elegant design to help your brand stand out in the digital landscape.',
  keywords: ['Web Development', 'Mobile Development', 'UI/UX Design', 'Next.js', 'React', 'TITANCODE'],
  authors: [{ name: 'TITANCODE', url: 'https://titancode.pl' }],
  creator: 'TITANCODE',
  publisher: 'TITANCODE',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'TITANCODE - Elevate Your Digital Experience',
    description: 'Premium web solutions that blend cutting-edge technology with elegant design.',
    url: 'https://www.titancode.pl',
    siteName: 'TITANCODE',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'A preview image for TITANCODE',
      },
    ],
    locale: getLocaleFromLang('pl'),
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TITANCODE - Elevate Your Digital Experience',
    description: 'Premium web solutions that blend cutting-edge technology with elegant design.',
    images: ['/twitter-image.png'],
  },
  icons: {
    icon: {
      url: "/logo.svg",
      type: "image/svg+xml",
    },
    apple: {
      url: "/logo.svg",
      type: "image/svg+xml",
    },
  },
  manifest: '/site.webmanifest',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const theme = cookieStore.get("theme")?.value || "system";

  const requestHeaders = await headers();
  const siteLang = requestHeaders.get('x-site-lang') || 'pl';

  return (
    <html lang={siteLang} className={theme} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "url": "https://www.titancode.pl/",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://www.titancode.pl/pl/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              },
    
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "TITANCODE",
              "url": "https://www.titancode.pl/",
              "logo": "https://www.titancode.pl/logo.svg",
              "sameAs": [
              ]
            })
          }}
        />
        <ThemeProviders theme={theme}>
          <LanguageProvider>
            <Header />
            <main>
              {children}
            <Analytics />
            <SpeedInsights/>
            </main>
            <Footer />
          </LanguageProvider>
        </ThemeProviders>
      </body>
    </html>
  );
}