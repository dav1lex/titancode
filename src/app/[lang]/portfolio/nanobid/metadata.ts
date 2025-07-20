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
      type: 'article',
      locale: locale === 'en' ? 'en_US' : 'pl_PL',
    },
    twitter: {
      card: 'summary_large_image',
      title: t.portfolio.projects.nanobid.seoTitle,
      description: t.portfolio.projects.nanobid.seoDescription,
    },
    alternates: {
      canonical: `/${locale}/portfolio/nanobid`,
      languages: {
        'en': '/en/portfolio/nanobid',
        'pl': '/pl/portfolio/nanobid',
      },
    },
  };
}