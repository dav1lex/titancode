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
    title: t.calculateEstimate.seo.title,
    description: t.calculateEstimate.seo.description,
    openGraph: {
      title: t.calculateEstimate.seo.title,
      description: t.calculateEstimate.seo.description,
      type: 'website',
      locale: 'pl_PL',
    },
    twitter: {
      card: 'summary_large_image',
      title: t.calculateEstimate.seo.title,
      description: t.calculateEstimate.seo.description,
    },
    alternates: {
      canonical: `/${locale}/calculate-estimate`,
      languages: {
        'pl-PL': '/pl/calculate-estimate',
        'en-US': '/en/calculate-estimate',
        'x-default': '/pl/calculate-estimate',
      },
    },
  };
}