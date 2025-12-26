"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/app/theme-toggle";
import LanguageSwitcher from "@/app/language-switcher";
import { useLanguage } from "@/app/language-context";
import { motion, AnimatePresence } from "framer-motion";
import "@fontsource/space-grotesk";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t } = useLanguage();
  const pathname = usePathname();
  const { language } = useLanguage();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const estimatePath = `/${language}/calculate-estimate`;
  const servicesPath = `/${language}/services`;

  return (
    <header 
      className={`sticky top-0 z-50 w-full backdrop-blur-md transition-all duration-300 ${
        scrolled 
          ? "bg-white/80 dark:bg-black/80 shadow-md" 
          : "bg-white dark:bg-black"
      } border-b border-gray-200 dark:border-gray-800`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Link href={`/${language}`} className="flex items-center gap-2">
              <Image
                src="/logo-sv.svg"
                alt="TITANCODE"
                width={44}
                height={44}
                className="h-11 w-11 lg:h-12 lg:w-12 dark:invert"
                priority
              />
              <motion.div
                className="block whitespace-nowrap font-['Space_Grotesk'] text-lg sm:text-xl font-bold tracking-tight text-black dark:text-white"
              >
                TITANCODE
              </motion.div>
            </Link>

          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-5 lg:space-x-8">
            {[
              { key: 'home', href: `/${language}` },
              { key: 'services', href: servicesPath },
              { key: 'portfolio', href: `/${language}/portfolio` },
              { key: 'blog', href: '/blog' },
              { key: 'about', href: `/${language}/about` },
              { key: 'contact', href: `/${language}/contact` },
            ].map((item) => {
              const isActive = item.key === 'home' ? pathname === item.href : pathname.startsWith(item.href);
              return (
                <Link
                  href={item.href}
                  key={item.key}
                  className={`relative font-['Space_Grotesk'] text-sm lg:text-base transition-colors group ${
                    isActive
                      ? 'text-black dark:text-white'
                      : 'text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white'
                  }`}
                >
                  <span className="relative z-10">{t(`nav.${item.key}`)}</span>
                  <motion.span
                    className="absolute bottom-0 left-0 h-0.5 bg-blue-500 dark:bg-cyan-400"
                    animate={{ width: isActive ? '100%' : '0%' }}
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Right controls */}
          <div className="flex items-center gap-3">
            {/* Primary CTA (desktop) */}
            <div className="hidden lg:flex items-center gap-3">
              <Button asChild className="font-['Space_Grotesk']">
                <Link href={estimatePath}>{t('header.primaryCta')}</Link>
              </Button>
            </div>

            <div className="hidden sm:flex items-center gap-3">
              <ThemeToggle />
              <span className="text-gray-300 dark:text-gray-700">|</span>
              <LanguageSwitcher />
            </div>
            <motion.div
              whileTap={{ scale: 0.9 }}
            >
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={toggleMenu}
                aria-label="Toggle menu"
              >
                <div className="relative w-6 h-6 flex items-center justify-center">
                  <motion.span
                    className="absolute block h-0.5 w-6 bg-current"
                    animate={{
                      rotate: isMenuOpen ? 45 : 0,
                      y: isMenuOpen ? 0 : -6,
                    }}
                    transition={{ duration: 0.3 }}
                  ></motion.span>
                  <motion.span
                    className="absolute block h-0.5 w-6 bg-current"
                    animate={{
                      opacity: isMenuOpen ? 0 : 1,
                      x: isMenuOpen ? 20 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  ></motion.span>
                  <motion.span
                    className="absolute block h-0.5 w-6 bg-current"
                    animate={{
                      rotate: isMenuOpen ? -45 : 0,
                      y: isMenuOpen ? 0 : 6,
                    }}
                    transition={{ duration: 0.3 }}
                  ></motion.span>
                </div>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      {/*  Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden fixed inset-0 top-16 bg-white/95 dark:bg-black/95 backdrop-blur-md z-40"
            initial={{ opacity: 0, height: 0 }}
            animate={{ 
              opacity: 1, 
              height: "calc(100vh - 4rem)",
            }}
            exit={{ 
              opacity: 0, 
              height: 0,
            }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div 
              className="container mx-auto px-4 py-8 h-full flex flex-col"
              initial="hidden"
              animate="show"
              exit="hidden"
              variants={{
                show: {
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
                hidden: {},
              }}
            >
              <div className="flex items-center justify-center gap-3 mb-8">
                <ThemeToggle />
                <LanguageSwitcher />
              </div>

              <nav className="flex flex-col space-y-8 text-lg">
                {[
                  { name: t("nav.home"), path: `/${language}` },
                  { name: t("nav.services"), path: `/${language}/services` },
                  { name: t("nav.calculate_estimate"), path: `/${language}/calculate-estimate` },
                  { name: t("nav.portfolio"), path: `/${language}/portfolio` },
                  { name: t("nav.blog"), path: "/blog" },
                  { name: t("nav.about"), path: `/${language}/about` },
                  { name: t("nav.contact"), path: `/${language}/contact` },
                ].map((item, i) => {
                  const isActive = item.name === t("nav.home") ? pathname === item.path : pathname.startsWith(item.path);
                  return (
                  <motion.div
                    key={i}
                    variants={{
                      hidden: { x: -20, opacity: 0 },
                      show: { x: 0, opacity: 1 },
                    }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  >
                    <Link
                      href={item.path}
                      className={`font-['Space_Grotesk'] text-2xl font-medium inline-block transition-colors ${
                        isActive 
                        ? "text-blue-500 dark:text-cyan-400"
                        : "text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white"
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <motion.div 
                        className="flex items-center space-x-2"
                        whileHover={{ x: 10 }}
                        transition={{ duration: 0.2 }}
                      >
                        <motion.span 
                          className="h-[2px] bg-blue-500 dark:bg-cyan-400"
                          animate={{ width: isActive ? 20 : 0 }}
                          whileHover={{ width: 20 }}
                          transition={{ duration: 0.2 }}
                        />
                        <span>{item.name}</span>
                      </motion.div>
                    </Link>
                  </motion.div>
                )})}
              </nav>
              <motion.div 
                className="mt-auto pb-8 text-center text-gray-500 dark:text-gray-400"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <p className="font-['Space_Grotesk']">© {new Date().getFullYear()} TITANCODE</p>
                <p className="mt-2 text-sm">{t("footer.rights")}</p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
} 