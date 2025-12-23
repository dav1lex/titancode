"use client";

import { useLanguage } from "@/app/language-context";
import PortfolioProjectLayoutSimple from "@/components/layouts/PortfolioProjectLayoutSimple";

export default function Page() {
  const { t } = useLanguage();

  const projectData = {
    title: t("portfolio.projects.kurs8klasisty.title"),
    subtitle: t("portfolio.projects.kurs8klasisty.subtitle"),
    mainImage: "/images/portfolio/english-tutor/main.png",
    projectInfo: {
      client: t("portfolio.projects.kurs8klasisty.client"),
      year: t("portfolio.projects.kurs8klasisty.year"),
      duration: t("portfolio.projects.kurs8klasisty.duration"),
    },
    summaryText: <p>{t("portfolio.projects.kurs8klasisty.summaryText")}</p>,
    challengeText: <p>{t("portfolio.projects.kurs8klasisty.challengeText")}</p>,
    solutionText: <p>{t("portfolio.projects.kurs8klasisty.solutionText")}</p>,
    technologies: ["HTML", "CSS", "PHP", "JavaScript", "MySQL", "Tailwind CSS", "Alpine.js"],
    images: [
      "/images/portfolio/english-tutor/main.png",
      "/images/portfolio/english-tutor/k2.png",
      "/images/portfolio/english-tutor/k3.png",
      "/images/portfolio/english-tutor/k4.png",
    ],
    liveSiteUrl: "https://kurs8klasisty.pl",
    t: t,
  };

  // Structured data removed in SEO reset; keeping page clean

  return (
    <>
      <PortfolioProjectLayoutSimple {...projectData} />
    </>
  );
}