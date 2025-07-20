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
    title: t.portfolio.projects.nanobid.seoTitle,
    description: t.portfolio.projects.nanobid.seoDescription,
    keywords: t.portfolio.projects.nanobid.seoKeywords.split(', '),
    openGraph: {
      title: t.portfolio.projects.nanobid.seoTitle,
      description: t.portfolio.projects.nanobid.seoDescription,
      type: 'website',
      locale: locale === 'en' ? 'en_US' : 'pl_PL',
      images: [
        {
          url: 'https://assets.titancode.pl/images/portfolio/nanobid/n1.png',
          width: 1200,
          height: 630,
          alt: t.portfolio.projects.nanobid.seoTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t.portfolio.projects.nanobid.seoTitle,
      description: t.portfolio.projects.nanobid.seoDescription,
      images: ['https://assets.titancode.pl/images/portfolio/nanobid/n1.png'],
    },
    alternates: {
      languages: {
        'en': '/en/portfolio/nanobid',
        'pl': '/pl/portfolio/nanobid',
      },
    },
  };
}