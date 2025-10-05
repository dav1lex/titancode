import type { Metadata } from "next";
import { type Locale } from "../../../../../i18n-config";
import en from "../../../../translations/en.json";
import pl from "../../../../translations/pl.json";

const translations = { en, pl };

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  const locale = params.lang as Locale;
  const t = translations[locale] || translations.en;

  const isEN = locale === 'en';
  return {
    title: t.portfolio.projects.kurs8klasisty.seoTitle,
    description: t.portfolio.projects.kurs8klasisty.seoDescription,
    robots: isEN ? { index: false, follow: true } : undefined,
    openGraph: {
      title: t.portfolio.projects.kurs8klasisty.seoTitle,
      description: t.portfolio.projects.kurs8klasisty.seoDescription,
      type: 'website',
      locale: 'pl_PL',
      images: [
        {
          url: 'https://assets.titancode.pl/images/portfolio/english-tutor/main.png',
          width: 1200,
          height: 630,
          alt: t.portfolio.projects.kurs8klasisty.seoTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t.portfolio.projects.kurs8klasisty.seoTitle,
      description: t.portfolio.projects.kurs8klasisty.seoDescription,
      images: ['https://assets.titancode.pl/images/portfolio/english-tutor/main.png'],
    },
    alternates: {
      canonical: `/${locale}/portfolio/kurs8klasisty`,
    },
  };
}