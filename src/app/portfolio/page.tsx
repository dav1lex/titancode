"use client";

import { useLanguage } from "../language-context";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Portfolio() {
  const { t } = useLanguage();

  const projects = [
    {
      slug: "nanobid",
      imageUrl: "https://titancode.pl/images/portfolio/nanobid/n1.png",
    },
    {
      slug: "kurs8klasisty",
      imageUrl: "https://titancode.pl/images/portfolio/english-tutor/main.png",
    },
  ];

  return (
    <div className="pb-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{t("portfolio.title")}</h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          {t("portfolio.subtitle")}
        </p>
      </div>
      <div className="border-t container mx-auto px-4">
        {projects.map((project) => (
          <Link href={`/portfolio/${project.slug}`} key={project.slug}>
            <div className="border-b p-6 md:p-8 transition-colors hover:bg-gray-50/50 dark:hover:bg-gray-900/50 flex flex-col md:flex-row items-center gap-6 md:gap-8">
              <div className="relative w-full md:w-48 h-48 md:h-32 flex-shrink-0">
                <Image
                  src={project.imageUrl}
                  alt={t(`portfolio.projects.${project.slug}.title`)}
                  fill
                  style={{ objectFit: "cover" }}
                  className="rounded-lg"
                />
              </div>
              <div className="flex-grow">
                <h2 className="text-xl font-semibold">
                  {t(`portfolio.projects.${project.slug}.title`)}
                </h2>
                <p className="text-gray-600 mt-1">
                  {t(`portfolio.projects.${project.slug}.description`)}
                </p>
              </div>
              <ArrowRight className="h-6 w-6 text-gray-400 hidden md:block" />
            </div>
          </Link>
        ))}
        <Link href="/contact">
          <div className="border-b p-6 md:p-8 transition-colors hover:bg-gray-50/50 dark:hover:bg-gray-900/50 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">
                {t("portfolio.projects.dreamProject.title")}
              </h2>
              <p className="text-gray-600 mt-1">
                {t("portfolio.projects.dreamProject.description")}
              </p>
            </div>
            <Button>{t("portfolio.projects.dreamProject.cta")}</Button>
          </div>
        </Link>
      </div>
    </div>
  );
}