"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
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

  // Logo animation variants
  const logoLetters = "TITANCODE".split("");
  
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
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center">
              <div className="overflow-hidden flex">
                {logoLetters.map((letter, index) => (
                  <motion.span
                    key={index}
                    className="text-xl font-bold font-['Space_Grotesk'] text-black dark:text-white inline-block"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0,
                      transition: {
                        delay: index * 0.05,
                        duration: 0.5
                      }
                    }}
                    whileHover={{
                      scale: 1.2,
                      color: index % 2 === 0 ? "#3B82F6" : "#10B981",
                      transition: { duration: 0.2 }
                    }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {["home", "services", "portfolio", "about", "contact"].map((item) => {
              const href = item === "home" ? "/" : `/${item}`;
              const isActive = item === 'home' ? pathname === href : pathname.startsWith(href);
              return (
              <Link 
                href={href} 
                key={item}
                className={`relative font-['Space_Grotesk'] transition-colors group ${
                  isActive
                    ? "text-black dark:text-white"
                    : "text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white"
                }`}
              >
                <span className="relative z-10">
                  {t(`nav.${item}`)}
                </span>
                <motion.span 
                  className="absolute bottom-0 left-0 h-0.5 bg-blue-500 dark:bg-cyan-400"
                  animate={{ width: isActive ? "100%" : "0%" }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                ></motion.span>
              </Link>
            )})}
          </nav>

          {/* Theme Toggle, Language Switcher and Mobile Menu Button */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <span className="text-gray-300 dark:text-gray-700">|</span>
            <LanguageSwitcher />
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
              <nav className="flex flex-col space-y-8 text-lg">
                {[
                  { name: t("nav.home"), path: "/" },
                  { name: t("nav.services"), path: "/services" },
                  { name: t("nav.portfolio"), path: "/portfolio" },
                  { name: t("nav.about"), path: "/about" },
                  { name: t("nav.contact"), path: "/contact" },
                ].map((item, i) => {
                  const isActive = item.path === "/" ? pathname === item.path : pathname.startsWith(item.path);
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