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
    title: t.search.seo.title,
    description: t.search.seo.description,
    openGraph: {
      title: t.search.seo.title,
      description: t.search.seo.description,
      type: 'website',
      locale: 'pl_PL',
    },
    twitter: {
      card: 'summary_large_image',
      title: t.search.seo.title,
      description: t.search.seo.description,
    },
    alternates: {
      canonical: `/${locale}/search`,
      languages: {
        'pl-PL': '/pl/search',
        'en-US': '/en/search',
        'x-default': '/pl/search',
      },
    },
  };
}