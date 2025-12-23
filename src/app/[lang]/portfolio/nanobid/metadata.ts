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
    openGraph: {
      title: t.portfolio.projects.nanobid.seoTitle,
      description: t.portfolio.projects.nanobid.seoDescription,
      type: 'article',
      locale: 'pl_PL',
    },
    twitter: {
      card: 'summary_large_image',
      title: t.portfolio.projects.nanobid.seoTitle,
      description: t.portfolio.projects.nanobid.seoDescription,
    },
    alternates: {
      canonical: `/${locale}/portfolio/nanobid`,
      languages: {
        'pl-PL': '/pl/portfolio/nanobid',
        'en-US': '/en/portfolio/nanobid',
        'x-default': '/pl/portfolio/nanobid',
      },
    },
  };
}