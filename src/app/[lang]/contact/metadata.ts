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
    title: t.contactPage.title,
    description: t.contactPage.subtitle,
    keywords: ['Contact TITANCODE', 'Web Development Inquiry', 'Get Quote', 'Project Consultation', 'Warsaw Web Development'],
    openGraph: {
      title: t.contactPage.title,
      description: t.contactPage.subtitle,
      type: 'website',
      locale: locale === 'en' ? 'en_US' : 'pl_PL',
    },
    twitter: {
      card: 'summary_large_image',
      title: t.contactPage.title,
      description: t.contactPage.subtitle,
    },
    alternates: {
      languages: {
        'en': '/en/contact',
        'pl': '/pl/contact',
      },
    },
  };
}