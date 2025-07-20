import type { Metadata } from "next";
import { i18n, type Locale } from "../../../i18n-config";
import en from "../../translations/en.json";
import pl from "../../translations/pl.json";

const translations = { en, pl };

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  const locale = params.lang as Locale;
  const t = translations[locale] || translations.en;

  return {
    title: t.hero.title.replace(/\n/g, ' ').trim(),
    description: t.hero.subtitle,
    keywords: ['Web Development', 'Custom Web Solutions', 'Next.js Development', 'E-commerce', 'SEO', 'TITANCODE', 'Warsaw', 'Poland'],
    openGraph: {
      title: t.hero.title.replace(/\n/g, ' ').trim(),
      description: t.hero.subtitle,
      type: 'website',
      locale: locale === 'en' ? 'en_US' : 'pl_PL',
    },
    twitter: {
      card: 'summary_large_image',
      title: t.hero.title.replace(/\n/g, ' ').trim(),
      description: t.hero.subtitle,
    },
    alternates: {
      canonical: `/${locale}`,
      languages: {
        'en': '/en',
        'pl': '/pl',
      },
    },
    icons: {
      icon: {
        url: "/logo.svg",
        type: "image/svg+xml",
      },
      apple: {
        url: "/logo.svg",
        type: "image/svg+xml",
      },
    },
  };
}

export function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}