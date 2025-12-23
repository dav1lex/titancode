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
    title: t.landingCourse.seo.title,
    description: t.landingCourse.seo.description,
    alternates: {
      canonical: `/${locale}/landing-page-dla-kursu-online`,
      languages: {
        "pl-PL": "/pl/landing-page-dla-kursu-online",
        "en-US": "/en/landing-page-dla-kursu-online",
        "x-default": "/pl/landing-page-dla-kursu-online",
      },
    },
    openGraph: {
      title: t.landingCourse.seo.title,
      description: t.landingCourse.seo.description,
      type: "website",
      locale: locale === "pl" ? "pl_PL" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: t.landingCourse.seo.title,
      description: t.landingCourse.seo.description,
    },
  };
}
