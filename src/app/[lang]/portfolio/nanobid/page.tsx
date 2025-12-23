"use client";

import { useLanguage } from "@/app/language-context";
import PortfolioProjectLayoutSimple from "@/components/layouts/PortfolioProjectLayoutSimple";

export default function Page() {
  const { t } = useLanguage();

  const projectData = {
    title: t("portfolio.projects.nanobid.title"),
    subtitle: t("portfolio.projects.nanobid.subtitle"),
    mainImage: "/images/portfolio/nanobid/n1.png",
    projectInfo: {
      client: t("portfolio.projects.nanobid.client"),
      year: t("portfolio.projects.nanobid.year"),
      duration: t("portfolio.projects.nanobid.duration"),
    },
    summaryText: <p>{t("portfolio.projects.nanobid.summaryText")}</p>,
    challengeText: <p>{t("portfolio.projects.nanobid.challengeText")}</p>,
    solutionText: <p>{t("portfolio.projects.nanobid.solutionText")}</p>,
    technologies: ["PHP", "MySQL", "JavaScript", "Bootstrap 5", "HTML5", "CSS3", "PHPMailer"],
    images: [
      "/images/portfolio/nanobid/n1.png",
      "/images/portfolio/nanobid/n2.png",
      "/images/portfolio/nanobid/n3.png",
      "/images/portfolio/nanobid/n4.png",
      "/images/portfolio/nanobid/n5.png",
      "/images/portfolio/nanobid/n6.png",
      "/images/portfolio/nanobid/n7.png",
    ],
    liveSiteUrl: "",
    // NOTE: Live URL removed (previously pointed to deprecated assets subdomain).
    // Add the real project URL here if/when available.
    t: t,
  };

  // Structured data removed in SEO reset; keeping page clean

  return (
    <>
      <PortfolioProjectLayoutSimple {...projectData} />
    </>
  );
}