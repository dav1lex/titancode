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
    title: t.portfolio.projects.careerflex.seoTitle,
    description: t.portfolio.projects.careerflex.seoDescription,
    robots: isEN ? { index: false, follow: true } : undefined,
    openGraph: {
      title: t.portfolio.projects.careerflex.seoTitle,
      description: t.portfolio.projects.careerflex.seoDescription,
      type: 'website',
      locale: isEN ? 'en_US' : 'pl_PL',
    },
    twitter: {
      card: 'summary_large_image',
      title: t.portfolio.projects.careerflex.seoTitle,
      description: t.portfolio.projects.careerflex.seoDescription,
    },
    alternates: {
      canonical: isEN ? '/pl/portfolio/careerflex' : `/${locale}/portfolio/careerflex`,
    },
  };
}
