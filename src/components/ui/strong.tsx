"use client";

import { useLanguage } from "@/app/language-context";

export default function Strong({ text }: { text: string }) {
  const { t } = useLanguage();
  const translatedText = t(text);
  const parts = translatedText.split(/(\*\*.*?\*\*)/);

  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return <strong key={index}>{part.slice(2, -2)}</strong>;
        }
        return part;
      })}
    </>
  );
}