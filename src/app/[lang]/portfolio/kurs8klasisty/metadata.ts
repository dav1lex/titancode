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

  return {
    title: t.portfolio.projects.kurs8klasisty.title,
    description: t.portfolio.projects.kurs8klasisty.description,
    keywords: ['Kurs8Klasisty', 'English Tutor', 'E-Learning Platform', 'Educational Website', 'PHP Development', 'TITANCODE Portfolio'],
    openGraph: {
      title: t.portfolio.projects.kurs8klasisty.title,
      description: t.portfolio.projects.kurs8klasisty.description,
      type: 'website',
      locale: locale === 'en' ? 'en_US' : 'pl_PL',
      images: [
        {
          url: 'https://assets.titancode.pl/images/portfolio/english-tutor/main.png',
          width: 1200,
          height: 630,
          alt: t.portfolio.projects.kurs8klasisty.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t.portfolio.projects.kurs8klasisty.title,
      description: t.portfolio.projects.kurs8klasisty.description,
      images: ['https://assets.titancode.pl/images/portfolio/english-tutor/main.png'],
    },
    alternates: {
      languages: {
        'en': '/en/portfolio/kurs8klasisty',
        'pl': '/pl/portfolio/kurs8klasisty',
      },
    },
  };
}