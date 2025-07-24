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
    title: t.portfolio.projects.linkedinJobMatcher.seoTitle,
    description: t.portfolio.projects.linkedinJobMatcher.seoDescription,
    keywords: t.portfolio.projects.linkedinJobMatcher.seoKeywords.split(', '),
    openGraph: {
      title: t.portfolio.projects.linkedinJobMatcher.seoTitle,
      description: t.portfolio.projects.linkedinJobMatcher.seoDescription,
      type: 'article',
      locale: locale === 'en' ? 'en_US' : 'pl_PL',
    },
    twitter: {
      card: 'summary_large_image',
      title: t.portfolio.projects.linkedinJobMatcher.seoTitle,
      description: t.portfolio.projects.linkedinJobMatcher.seoDescription,
    },
    alternates: {
      canonical: `/${locale}/portfolio/linkedin-job-matcher`,
      languages: {
        'en': '/en/portfolio/linkedin-job-matcher',
        'pl': '/pl/portfolio/linkedin-job-matcher',
      },
    },
  };
}