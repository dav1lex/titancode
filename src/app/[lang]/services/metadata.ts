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
    title: t.services.pageSeo.title,
    description: t.services.pageSeo.description,
    openGraph: {
      title: t.services.pageSeo.title,
      description: t.services.pageSeo.description,
      type: 'website',
      locale: 'pl_PL',
    },
    twitter: {
      card: 'summary_large_image',
      title: t.services.pageSeo.title,
      description: t.services.pageSeo.description,
    },
    alternates: {
      canonical: `/${locale}/services`,
      languages: {
        'pl-PL': '/pl/services',
        'en-US': '/en/services',
        'x-default': '/pl/services',
      },
    },
  };
}