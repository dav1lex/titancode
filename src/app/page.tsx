"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useLanguage } from "./language-context";

export default function Home() {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black text-black dark:text-white transition-all duration-300">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">{t("home.welcome")}</h1>
        <p className="text-lg mb-6">{t("home.subtitle")}</p>
        <Button>{t("home.getStarted")}</Button>
      </div>
    </div>
  );
}
