"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { i18n } from "../../i18n-config";
import { Button } from "@/components/ui/button";

import { useLanguage } from "@/app/language-context";

export default function LanguageSwitcher() {
  const pathName = usePathname();
  const { language } = useLanguage();

  const redirectedPathName = (locale: string) => {
    if (!pathName) return "/";
    const segments = pathName.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  const getNextLocale = () => {
    const currentLocaleIndex = i18n.locales.indexOf(language);
    const nextLocaleIndex = (currentLocaleIndex + 1) % i18n.locales.length;
    return i18n.locales[nextLocaleIndex];
  };

  return (
    <Link href={redirectedPathName(getNextLocale())}>
      <Button variant="outline" size="sm">
        {language.toUpperCase()}
      </Button>
    </Link>
  );
}