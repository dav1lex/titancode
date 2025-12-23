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
    title: t.landingAdminPanel.seo.title,
    description: t.landingAdminPanel.seo.description,
    alternates: {
      canonical: `/${locale}/panel-administracyjny-na-zamowienie`,
      languages: {
        "pl-PL": "/pl/panel-administracyjny-na-zamowienie",
        "en-US": "/en/panel-administracyjny-na-zamowienie",
        "x-default": "/pl/panel-administracyjny-na-zamowienie",
      },
    },
    openGraph: {
      title: t.landingAdminPanel.seo.title,
      description: t.landingAdminPanel.seo.description,
      type: "website",
      locale: locale === "pl" ? "pl_PL" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: t.landingAdminPanel.seo.title,
      description: t.landingAdminPanel.seo.description,
    },
  };
}
