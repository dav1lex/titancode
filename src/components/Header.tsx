"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/app/theme-toggle";
import LanguageSwitcher from "@/app/language-switcher";
import { useLanguage } from "@/app/language-context";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { t } = useLanguage();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-800/50 shadow-lg shadow-black/5 dark:shadow-black/20' 
          : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex h-16 lg:h-20 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <Link href="/" className="group flex items-center gap-3 transition-all duration-300">
                {/* Logo Icon */}
                <div className="relative">
                 
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg blur opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                </div>
                
                {/* Logo Text */}
                <span className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-100 dark:to-white bg-clip-text text-transparent tracking-tight">
                  TITANCODE
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
              {[
                { href: "/", key: "nav.home" },
                { href: "/projects", key: "nav.projects" },
                { href: "/about", key: "nav.about" },
                { href: "/contact", key: "nav.contact" }
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative px-4 py-2 text-sm lg:text-base font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-all duration-300 group"
                >
                  <span className="relative z-10">{t(item.key)}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 group-hover:w-full group-hover:left-0 transition-all duration-300"></div>
                </Link>
              ))}
            </nav>

            {/* Right Side Controls */}
            <div className="flex items-center space-x-3 lg:space-x-4">
              {/* Theme Toggle */}
              <div className="relative">
                <ThemeToggle />
              </div>

              {/* Divider */}
              <div className="h-6 w-px bg-gradient-to-b from-transparent via-gray-300 to-transparent dark:via-gray-700"></div>

              {/* Language Switcher */}
              <div className="relative">
                <LanguageSwitcher />
              </div>

            

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden p-2 hover:bg-gray-100/80 dark:hover:bg-gray-800/80 rounded-lg transition-colors duration-300"
                onClick={toggleMenu}
                aria-label="Toggle menu"
              >
                <div className="relative w-6 h-6 flex items-center justify-center">
                  <span 
                    className={`absolute block h-0.5 w-5 bg-current transform transition-all duration-300 ease-out ${
                      isMenuOpen ? 'rotate-45' : '-translate-y-1.5'
                    }`}
                  ></span>
                  <span 
                    className={`absolute block h-0.5 w-5 bg-current transform transition-all duration-300 ease-out ${
                      isMenuOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
                    }`}
                  ></span>
                  <span 
                    className={`absolute block h-0.5 w-5 bg-current transform transition-all duration-300 ease-out ${
                      isMenuOpen ? '-rotate-45' : 'translate-y-1.5'
                    }`}
                  ></span>
                </div>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      <div 
        className={`md:hidden fixed inset-0 z-40 transition-all duration-300 ${
          isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm"
          onClick={() => setIsMenuOpen(false)}
        />
        
        {/* Menu Panel */}
        <div 
          className={`absolute top-16 lg:top-20 right-0 w-80 max-w-[90vw] h-[calc(100vh-4rem)] lg:h-[calc(100vh-5rem)] bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-l border-gray-200/50 dark:border-gray-800/50 shadow-2xl transform transition-all duration-300 ease-out ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex flex-col h-full">
            {/* Navigation Links */}
            <nav className="flex-1 px-6 py-8 space-y-6">
              {[
                { href: "/", key: "nav.home" },
                { href: "/projects", key: "nav.projects" },
                { href: "/about", key: "nav.about" },
                { href: "/contact", key: "nav.contact" }
              ].map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex items-center space-x-4 text-lg font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-all duration-300"
                  onClick={() => setIsMenuOpen(false)}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="transform group-hover:translate-x-2 transition-transform duration-300">
                    {t(item.key)}
                  </span>
                </Link>
              ))}
            </nav>

            {/* CTA Section */}
            <div className="px-6 py-6 border-t border-gray-200/50 dark:border-gray-800/50">
              <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-lg font-semibold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 transform hover:scale-105">
                {t("nav.getStarted") || "Get Started"}
              </Button>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200/50 dark:border-gray-800/50">
              <p>© {new Date().getFullYear()} TITANCODE</p>
              <p className="mt-1">{t("footer.rights") || "All rights reserved"}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}