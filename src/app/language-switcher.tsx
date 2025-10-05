"use client";

import { usePathname, useRouter } from "next/navigation";
import { i18n } from "../../i18n-config";
import { Button } from "@/components/ui/button";

import { useLanguage } from "@/app/language-context";

export default function LanguageSwitcher() {
  const pathName = usePathname();
  const { language } = useLanguage();
  const router = useRouter();

  const redirectedPathName = (locale: string) => {
    if (!pathName) return "/";
    const segments = pathName.split("/");
    const currentLocale = segments[1];
    // Only operate on localized routes like /pl/... or /en/...
    if (!(i18n.locales as readonly string[]).includes(currentLocale)) {
      return `/${locale}`; // fallback to locale home if not localized route (e.g., /blog)
    }
    segments[1] = locale;
    return segments.join("/");
  };

  const getNextLocale = () => {
    const currentLocaleIndex = i18n.locales.indexOf(language);
    const nextLocaleIndex = (currentLocaleIndex + 1) % i18n.locales.length;
    return i18n.locales[nextLocaleIndex];
  };

  if (i18n.locales.length < 2) return null;
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => router.push(redirectedPathName(getNextLocale()))}
    >
      {getNextLocale().toUpperCase()}
    </Button>
  );
}