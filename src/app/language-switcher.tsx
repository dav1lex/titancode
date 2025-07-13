"use client";

import { Button } from "@/components/ui/button";
import { useLanguage } from "./language-context";

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "pl" : "en");
  };

  return (
    <Button 
      variant="outline" 
      size="sm" 
      onClick={toggleLanguage}
      className="flex items-center justify-center min-w-[40px]"
    >
      {language === "en" ? "PL" : "EN"}
    </Button>
  );
} 