"use client";

import { useLanguage } from "@/app/language-context";
import PortfolioProjectLayout from "@/components/layouts/PortfolioProjectLayout";

export default function Page() {
  const { t, language } = useLanguage();

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

  const techArticleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": t("portfolio.projects.nanobid.seoTitle"),
    "description": t("portfolio.projects.nanobid.seoDescription"),
    "image": projectData.mainImage,
    "author": {
      "@type": "Organization",
      "name": "TITANCODE"
    },
    "publisher": {
      "@type": "Organization",
      "name": "TITANCODE",
      "logo": {
        "@type": "ImageObject",
        "url": "https://titancode.pl/og-image.png"
      }
    },
    "datePublished": "2025-01-01", // Example date, should be dynamic in a real app
    "dateModified": "2025-01-01",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://titancode.pl/${language}/portfolio/nanobid`
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": t("nav.home"),
        "item": `https://titancode.pl/${language}`
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": t("nav.portfolio"),
        "item": `https://titancode.pl/${language}/portfolio`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": t("portfolio.projects.nanobid.title"),
        "item": `https://titancode.pl/${language}/portfolio/nanobid`
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(techArticleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <PortfolioProjectLayout {...projectData} />
    </>
  );
}