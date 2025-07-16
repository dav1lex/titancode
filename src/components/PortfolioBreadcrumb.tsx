"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useLanguage } from "@/app/language-context";
import { usePathname } from "next/navigation";
import Link from "next/link";

export function PortfolioBreadcrumb() {
  const { language, t } = useLanguage();
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  const isProjectPage = segments.length > 2 && segments[1] === "portfolio";

  return (
    <Breadcrumb className="mb-8">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href={`/${language}`}>{t("nav.home")}</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          {isProjectPage ? (
            <BreadcrumbLink asChild>
              <Link href={`/${language}/portfolio`}>{t("nav.portfolio")}</Link>
            </BreadcrumbLink>
          ) : (
            <BreadcrumbPage>{t("nav.portfolio")}</BreadcrumbPage>
          )}
        </BreadcrumbItem>
        {isProjectPage && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>
                {t(`portfolio.projects.${segments[2]}.title`)}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}