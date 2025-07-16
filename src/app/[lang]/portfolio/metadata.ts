import type { Metadata } from "next";
import { type Locale } from "../../../../i18n-config";
import en from "../../../translations/en.json";
import pl from "../../../translations/pl.json";

const translations = { en, pl };

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  const locale = params.lang as Locale;
  const t = translations[locale] || translations.en;

  return {
    title: t.portfolio.title,
    description: t.portfolio.subtitle,
    keywords: ['TITANCODE Portfolio', 'Web Development Projects', 'Custom Web Solutions', 'E-commerce Projects', 'Next.js Projects'],
    openGraph: {
      title: t.portfolio.title,
      description: t.portfolio.subtitle,
      type: 'website',
      locale: locale === 'en' ? 'en_US' : 'pl_PL',
    },
    twitter: {
      card: 'summary_large_image',
      title: t.portfolio.title,
      description: t.portfolio.subtitle,
    },
    alternates: {
      languages: {
        'en': '/en/portfolio',
        'pl': '/pl/portfolio',
      },
    },
  };
}