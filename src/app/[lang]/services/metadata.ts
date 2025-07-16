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
    title: t.services.title,
    description: t.services.subtitle,
    keywords: ['Web Development Services', 'Custom Web Solutions', 'E-commerce Development', 'SEO Services', 'Technical Consulting', 'TITANCODE'],
    openGraph: {
      title: t.services.title,
      description: t.services.subtitle,
      type: 'website',
      locale: locale === 'en' ? 'en_US' : 'pl_PL',
    },
    twitter: {
      card: 'summary_large_image',
      title: t.services.title,
      description: t.services.subtitle,
    },
    alternates: {
      languages: {
        'en': '/en/services',
        'pl': '/pl/services',
      },
    },
  };
}