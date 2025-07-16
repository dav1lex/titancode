"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { i18n } from "../../i18n-config";
import { Button } from "@/components/ui/button";

export default function LanguageSwitcher() {
  const pathName = usePathname();

  const redirectedPathName = (locale: string) => {
    if (!pathName) return "/";
    const segments = pathName.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  return (
    <div>
      {i18n.locales.map((locale) => {
        return (
          <Link
            key={locale}
            href={redirectedPathName(locale)}
          >
            <Button variant="outline" size="sm">
              {locale.toUpperCase()}
            </Button>
          </Link>
        );
      })}
    </div>
  );
}