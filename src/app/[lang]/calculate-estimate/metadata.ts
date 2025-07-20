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
    title: t.estimatePage.mainTitle,
    description: t.estimatePage.mainSubtitle,
    keywords: ['Web Development Estimate', 'Project Cost Calculator', 'Website Pricing', 'Development Quote', 'TITANCODE Pricing'],
    openGraph: {
      title: t.estimatePage.mainTitle,
      description: t.estimatePage.mainSubtitle,
      type: 'website',
      locale: locale === 'en' ? 'en_US' : 'pl_PL',
    },
    twitter: {
      card: 'summary_large_image',
      title: t.estimatePage.mainTitle,
      description: t.estimatePage.mainSubtitle,
    },
    alternates: {
      canonical: `/${locale}/calculate-estimate`,
      languages: {
        'en': '/en/calculate-estimate',
        'pl': '/pl/calculate-estimate',
      },
    },
  };
}