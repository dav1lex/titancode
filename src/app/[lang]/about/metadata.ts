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

  const isEN = locale === 'en';
  return {
    title: t.aboutPage.hero.seoTitle,
    description: t.aboutPage.hero.seoDescription,
    robots: isEN ? { index: false, follow: true } : undefined,
    openGraph: {
      title: t.aboutPage.hero.seoTitle,
      description: t.aboutPage.hero.seoDescription,
      type: 'website',
      locale: 'pl_PL',
    },
    twitter: {
      card: 'summary_large_image',
      title: t.aboutPage.hero.seoTitle,
      description: t.aboutPage.hero.seoDescription,
    },
    alternates: {
      canonical: isEN ? '/pl/about' : `/${locale}/about`,
    },
  };
}