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
    title: t.services.seoTitle,
    description: t.services.seoDescription,
    keywords: t.services.seoKeywords.split(', '),
    openGraph: {
      title: t.services.seoTitle,
      description: t.services.seoDescription,
      type: 'website',
      locale: locale === 'en' ? 'en_US' : 'pl_PL',
    },
    twitter: {
      card: 'summary_large_image',
      title: t.services.seoTitle,
      description: t.services.seoDescription,
    },
    alternates: {
      languages: {
        'en': '/en/services',
        'pl': '/pl/services',
      },
    },
  };
}