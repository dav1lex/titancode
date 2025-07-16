import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { Providers } from "../providers";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { LanguageProvider } from "../language-context";
import { i18n } from "../../../i18n-config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export const metadata: Metadata = {
  // Set the base URL for your site.
  metadataBase: new URL('https://example.com'), // TODO: Replace with your actual domain

  // Define a dynamic title for better SEO.
  title: {
    default: 'TITANCODE - Next-Generation Development Platform', // Title for the home page
    template: `%s | TITANCODE`, // Template for other pages (e.g., "Services | TITANCODE")
  },

  // Use a more descriptive and engaging description.
  description: 'We craft premium web solutions that blend cutting-edge technology with elegant design to help your brand stand out in the digital landscape.',

  // Add relevant keywords for search engines.
  keywords: ['Web Development', 'Mobile Development', 'UI/UX Design', 'Next.js', 'React', 'TITANCODE'],

  // Specify the author and publisher.
  authors: [{ name: 'TITANCODE', url: 'https://example.com' }], // TODO: Replace with your actual domain
  creator: 'TITANCODE',
  publisher: 'TITANCODE',

  // Control how search engines crawl your site.
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

  // Configure Open Graph metadata for rich social media sharing.
  openGraph: {
    title: 'TITANCODE - Elevate Your Digital Experience',
    description: 'Premium web solutions that blend cutting-edge technology with elegant design.',
    url: 'https://example.com', // TODO: Replace with your actual domain
    siteName: 'TITANCODE',
    images: [
      {
        url: '/og-image.png', // Place this image in the `public` directory.
        width: 1200,
        height: 630,
        alt: 'A preview image for TITANCODE',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },

  // Configure Twitter-specific metadata for Twitter Cards.
  twitter: {
    card: 'summary_large_image',
    title: 'TITANCODE - Elevate Your Digital Experience',
    description: 'Premium web solutions that blend cutting-edge technology with elegant design.',
    images: ['/twitter-image.png'], // Place this image in the `public` directory.
  },

  // Define icons for browsers and devices.
  icons: {
    icon: '/favicon.ico', // Place favicon.ico in the `public` directory.
    apple: '/apple-touch-icon.png', // Place this image in the `public` directory.
  },

  // Link to a web app manifest file.
  manifest: '/site.webmanifest', // Place this file in the `public` directory.
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  return (
    <html lang={lang} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <LanguageProvider>
            <Header />
            <main>
              {children}
            </main>
            <Footer />
          </LanguageProvider>
        </Providers>
      </body>
    </html>
  );
}