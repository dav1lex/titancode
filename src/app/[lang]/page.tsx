import type { Metadata } from 'next';
import { Locale } from '../../../i18n-config';
import HomeClient from './home-client';

type Props = {
  params: Promise<{ lang: Locale }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const isPl = lang === 'pl';

  const title = isPl
    ? 'Tworzenie Stron Internetowych Warszawa | Profesjonalne Strony WWW'
    : 'Custom Web Development | Fast & SEO-Optimized Websites';
  
  const description = isPl
    ? 'Profesjonalne tworzenie stron internetowych w Warszawie. Projektujemy szybkie, nowoczesne i zoptymalizowane pod SEO strony WWW dla firm. Indywidualne projekty, gwarancja jakości.'
    : 'Professional custom web development in Warsaw. We design fast, modern, and SEO-optimized websites for businesses. Bespoke projects, quality guaranteed.';

  // keywords removed to simplify metadata and avoid unused variables


  return {
    title,
    description,
    alternates: {
      canonical: `/${lang}`,
      languages: {
        'pl-PL': '/pl',
        'en-US': '/en',
        'x-default': '/pl',
      },
    },
  };
}

export default function Home() {
  return (
    <>
      <HomeClient />
    </>
  );
}