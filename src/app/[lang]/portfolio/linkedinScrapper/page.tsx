"use client";

import { useLanguage } from "@/app/language-context";
import PortfolioProjectLayout from "@/components/layouts/PortfolioProjectLayout";

export default function Page() {
  const { t, language } = useLanguage();

  const projectData = {
    title: t("portfolio.projects.linkedinJobMatcher.title"),
    subtitle: t("portfolio.projects.linkedinJobMatcher.subtitle"),
    mainImage: "https://assets.titancode.pl/images/portfolio/linkedin-scrapper/main.png",
    projectInfo: {
      client: t("portfolio.projects.linkedinJobMatcher.client"),
      year: t("portfolio.projects.linkedinJobMatcher.year"),
      duration: t("portfolio.projects.linkedinJobMatcher.duration"),
    },
    summaryText: <p>{t("portfolio.projects.linkedinJobMatcher.summaryText")}</p>,
    challengeText: <p>{t("portfolio.projects.linkedinJobMatcher.challengeText")}</p>,
    solutionText: <p>{t("portfolio.projects.linkedinJobMatcher.solutionText")}</p>,
    technologies: ["Python", "Playwright", "PyPDF2", "OpenAI API"],
    images: [
      "https://assets.titancode.pl/images/portfolio/linkedin-scrapper/l1.png",
      "https://assets.titancode.pl/images/portfolio/linkedin-scrapper/l2.png",
      "https://assets.titancode.pl/images/portfolio/linkedin-scrapper/l3.png",
      "https://assets.titancode.pl/images/portfolio/linkedin-scrapper/l4.png",
    ],
    t: t,
  };

  const techArticleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": t("portfolio.projects.linkedinJobMatcher.seoTitle"),
    "description": t("portfolio.projects.linkedinJobMatcher.seoDescription"),
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
        "url": "https://www.titancode.pl/og-image.png"
      }
    },
    "datePublished": "2025-07-24",
    "dateModified": "2025-07-24",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.titancode.pl/${language}/portfolio/linkedin-job-matcher`
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
        "item": `https://www.titancode.pl/${language}`
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": t("nav.portfolio"),
        "item": `https://www.titancode.pl/${language}/portfolio`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": t("portfolio.projects.linkedinJobMatcher.title"),
        "item": `https://www.titancode.pl/${language}/portfolio/linkedin-job-matcher`
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