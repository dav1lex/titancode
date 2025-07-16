"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { useParams } from "next/navigation";
import en from "../translations/en.json";
import pl from "../translations/pl.json";
import { Locale } from "../../i18n-config";

type NestedTranslations = {
  [key: string]: string | string[] | NestedTranslations;
};

type LanguageContextType = {
  language: Locale;
  t: (key: string) => string;
};

const translations: { [key: string]: NestedTranslations } = {
  en,
  pl,
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const params = useParams();
  const language = (params.lang as Locale) || "en";

  const t = (key: string): string => {
    const keys = key.split(".");
    let result: NestedTranslations | string | string[] =
      translations[language];
    for (const k of keys) {
      if (
        result &&
        typeof result === "object" &&
        !Array.isArray(result) &&
        k in result
      ) {
        result = (result as NestedTranslations)[k];
      } else {
        return key;
      }
    }
    return typeof result === "string" ? result : key;
  };

  return (
    <LanguageContext.Provider value={{ language, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}