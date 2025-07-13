"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/app/theme-toggle";
import LanguageSwitcher from "@/app/language-switcher";
import { useLanguage } from "@/app/language-context";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useLanguage();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Link href="/" className="text-xl font-bold text-black dark:text-white">
              TITANCODE
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white transition-colors">
              {t("nav.home")}
            </Link>
            <Link href="/services" className="text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white transition-colors">
              {t("nav.services")}
            </Link>
            <Link href="/portfolio" className="text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white transition-colors">
              {t("nav.portfolio")}
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white transition-colors">
              {t("nav.about")}
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white transition-colors">
              {t("nav.contact")}
            </Link>
          </nav>

          {/* Theme Toggle, Language Switcher and Mobile Menu Button */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <span className="text-gray-300 dark:text-gray-700">|</span>
            <LanguageSwitcher />
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-6 flex items-center justify-center">
                <span
                  className={`absolute block h-0.5 w-6 bg-current transform transition-all duration-300 ease-in-out ${isMenuOpen ? 'rotate-45' : '-translate-y-1.5'
                    }`}
                ></span>
                <span
                  className={`absolute block h-0.5 w-6 bg-current transform transition-all duration-300 ease-in-out ${isMenuOpen ? 'opacity-0' : 'opacity-100'
                    }`}
                ></span>
                <span
                  className={`absolute block h-0.5 w-6 bg-current transform transition-all duration-300 ease-in-out ${isMenuOpen ? '-rotate-45' : 'translate-y-1.5'
                    }`}
                ></span>
              </div>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden fixed inset-x-0 top-16 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 transform transition-all duration-300 ease-in-out ${isMenuOpen
            ? 'opacity-100 translate-y-0 h-[calc(100vh-4rem)]'
            : 'opacity-0 -translate-y-4 h-0 pointer-events-none'
          }`}
      >
        <div className="container mx-auto px-4 py-8 h-full flex flex-col">
          <nav className="flex flex-col space-y-6 text-lg">
            <Link
              href="/"
              className="text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white transition-colors transform hover:translate-x-2 duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("nav.home")}
            </Link>
            <Link
              href="/services"
              className="text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white transition-colors transform hover:translate-x-2 duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("nav.services")}
            </Link>
            <Link
              href="/portfolio"
              className="text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white transition-colors transform hover:translate-x-2 duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("nav.portfolio")}
            </Link>
            <Link
              href="/about"
              className="text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white transition-colors transform hover:translate-x-2 duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("nav.about")}
            </Link>
            <Link
              href="/contact"
              className="text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white transition-colors transform hover:translate-x-2 duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("nav.contact")}
            </Link>
          </nav>
          <div className="mt-auto pb-8 text-center text-gray-500 dark:text-gray-400">
            <p>© {new Date().getFullYear()} TITANCODE</p>
            <p className="mt-2 text-sm">{t("footer.rights")}</p>
          </div>
        </div>
      </div>
    </header>
  );
} 