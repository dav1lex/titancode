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
    title: t.landingWarsaw.seo.title,
    description: t.landingWarsaw.seo.description,
    alternates: {
      canonical: `/${locale}/strony-internetowe-warszawa`,
      languages: {
        "pl-PL": "/pl/strony-internetowe-warszawa",
        "en-US": "/en/strony-internetowe-warszawa",
        "x-default": "/pl/strony-internetowe-warszawa",
      },
    },
    openGraph: {
      title: t.landingWarsaw.seo.title,
      description: t.landingWarsaw.seo.description,
      type: "website",
      locale: locale === "pl" ? "pl_PL" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: t.landingWarsaw.seo.title,
      description: t.landingWarsaw.seo.description,
    },
  };
}
