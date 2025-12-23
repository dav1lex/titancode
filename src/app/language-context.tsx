"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { useParams } from "next/navigation";
import en from "../translations/en.json";
import pl from "../translations/pl.json";
import { Locale } from "../../i18n-config";

type TranslationValue =
  | string
  | number
  | boolean
  | null
  | TranslationObject
  | TranslationValue[];

type TranslationObject = {
  [key: string]: TranslationValue;
};

type NestedTranslations = TranslationObject;

type LanguageContextType = {
  language: Locale;
  t: (key: string) => string;
  tArray: (key: string) => string[];
};

const translations: Record<string, NestedTranslations> = {
  en,
  pl,
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const params = useParams();
  const language = (params.lang as Locale) || "pl";

  const t = (key: string): string => {
    const keys = key.split(".");
    let current: TranslationValue = translations[language];

    for (const k of keys) {
      // Support arrays in translation JSON, e.g. "cards.0.title"
      if (Array.isArray(current)) {
        const index = Number.parseInt(k, 10);
        if (!Number.isNaN(index) && index >= 0 && index < current.length) {
          current = current[index];
          continue;
        }
        return key;
      }

      if (current && typeof current === "object") {
        const obj = current as TranslationObject;
        if (k in obj) {
          current = obj[k];
          continue;
        }
      }

      return key;
    }

    return typeof current === "string" ? current : key;
  };

  const tArray = (key: string): string[] => {
    const keys = key.split(".");
    let current: TranslationValue = translations[language];

    for (const k of keys) {
      if (Array.isArray(current)) {
        const index = Number.parseInt(k, 10);
        if (!Number.isNaN(index) && index >= 0 && index < current.length) {
          current = current[index];
          continue;
        }
        return [key];
      }

      if (current && typeof current === "object") {
        const obj = current as TranslationObject;
        if (k in obj) {
          current = obj[k];
          continue;
        }
      }

      return [key];
    }

    if (!Array.isArray(current)) return [key];

    // Only return primitive arrays as string[]
    const values = current.filter(
      (v): v is string | number | boolean =>
        typeof v === "string" || typeof v === "number" || typeof v === "boolean"
    );

    return values.map(String);
  };

  return (
    <LanguageContext.Provider value={{ language, t, tArray }}>
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