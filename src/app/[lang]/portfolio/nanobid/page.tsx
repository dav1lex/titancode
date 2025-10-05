"use client";

import { useLanguage } from "@/app/language-context";
import PortfolioProjectLayout from "@/components/layouts/PortfolioProjectLayout";

export default function Page() {
  const { t } = useLanguage();

  const projectData = {
    title: t("portfolio.projects.nanobid.title"),
    subtitle: t("portfolio.projects.nanobid.subtitle"),
    mainImage: "https://assets.titancode.pl/images/portfolio/nanobid/n1.png",
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
      "https://assets.titancode.pl/images/portfolio/nanobid/n1.png",
      "https://assets.titancode.pl/images/portfolio/nanobid/n2.png",
      "https://assets.titancode.pl/images/portfolio/nanobid/n3.png",
      "https://assets.titancode.pl/images/portfolio/nanobid/n4.png",
      "https://assets.titancode.pl/images/portfolio/nanobid/n5.png",
      "https://assets.titancode.pl/images/portfolio/nanobid/n6.png",
      "https://assets.titancode.pl/images/portfolio/nanobid/n7.png",
    ],
    liveSiteUrl: "https://assets.titancode.pl/test/",
    t: t,
  };

  // Structured data removed in SEO reset; keeping page clean

  return (
    <>
      <PortfolioProjectLayout {...projectData} />
    </>
  );
}