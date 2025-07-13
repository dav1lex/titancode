"use client";

import React, { useState, useEffect } from 'react';
import { useLanguage } from "./language-context";
import { useTheme } from "next-themes";
import { Button } from '@/components/ui/button';

export default function Home() {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ensure we only run theme detection after mount to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Only render content after mounting to avoid hydration mismatch
  if (!mounted) return <div className="min-h-screen"></div>;

  const isDark = theme === "dark";

  return (
    <div className={`min-h-screen relative overflow-hidden transition-all duration-500 ${
      isDark 
        ? 'bg-gradient-to-b from-black via-purple-900 to-purple-800' 
        : 'bg-gradient-to-b from-blue-50 via-blue-100 to-blue-200'
    }`}>

      <div className="container mx-auto px-4 py-24 md:py-32">
        <h1 className="text-4xl font-bold text-center mb-8">
          {t("home.welcome")}
        </h1>
        <p className="text-lg text-center mb-12">
          {t("home.subtitle")}
        </p>
        <div className="flex justify-center">
          <Button className="primary">
            {t("home.getStarted")}
          </Button>
        </div>
      </div>
    </div>
  );
}
