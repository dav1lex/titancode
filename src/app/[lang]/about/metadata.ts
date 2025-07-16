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
    title: t.aboutPage.hero.title,
    description: t.aboutPage.hero.subtitle,
    keywords: ['About TITANCODE', 'Web Development Team', 'Custom Web Solutions', 'Digital Agency', 'Next.js Experts'],
    openGraph: {
      title: t.aboutPage.hero.title,
      description: t.aboutPage.hero.subtitle,
      type: 'website',
      locale: locale === 'en' ? 'en_US' : 'pl_PL',
    },
    twitter: {
      card: 'summary_large_image',
      title: t.aboutPage.hero.title,
      description: t.aboutPage.hero.subtitle,
    },
    alternates: {
      languages: {
        'en': '/en/about',
        'pl': '/pl/about',
      },
    },
  };
}