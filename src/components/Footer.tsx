"use client";
import React from "react";
import Link from "next/link";
import { useLanguage } from "@/app/language-context";
import { FaGithub, FaFacebook } from "react-icons/fa";
import "@fontsource/space-grotesk";

const Footer = () => {
  const { t, language } = useLanguage();

  const socialLinks = [
    {
      name: "GitHub",
      icon: FaGithub,
      url: "https://github.com/dav1lex",
    },
    {
      name: "Facebook",
      icon: FaFacebook,
      url: "https://www.facebook.com/titancodepoland/",
    },
  ];

  const navLinks = [
    { name: t("nav.home"), href: `/${language}` },
    { name: t("nav.services"), href: `/${language}/services` },
    { name: t("nav.portfolio"), href: `/${language}/portfolio` },
    { name: t("nav.about"), href: `/${language}/about` },
    { name: t("nav.contact"), href: `/${language}/contact` },
  ];

  return (
    <footer className="border-t dark:bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <Link href={`/${language}`} className="flex items-center space-x-2">
                <span className="font-bold text-xl font-['Space_Grotesk']">TITANCODE</span>
            </Link>
            <p className="text-muted-foreground text-sm">
              {t("footer.about")}
            </p>
          </div>

          <div>
            <h3 className="font-semibold tracking-wider uppercase">
              {t("footer.navigation")}
            </h3>
            <ul className="mt-4 space-y-2">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold tracking-wider uppercase">
              {t("footer.followUs")}
            </h3>
            <div className="mt-4 flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <social.icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 border-t pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} TITANCODE. {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;