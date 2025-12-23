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
    title: t.portfolio.seoTitle,
    description: t.portfolio.seoDescription,
    openGraph: {
      title: t.portfolio.seoTitle,
      description: t.portfolio.seoDescription,
      type: 'website',
      locale: 'pl_PL',
    },
    twitter: {
      card: 'summary_large_image',
      title: t.portfolio.seoTitle,
      description: t.portfolio.seoDescription,
    },
    alternates: {
      canonical: `/${locale}/portfolio`,
      languages: {
        'pl-PL': '/pl/portfolio',
        'en-US': '/en/portfolio',
        'x-default': '/pl/portfolio',
      },
    },
  };
}