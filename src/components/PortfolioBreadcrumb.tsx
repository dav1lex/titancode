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
  const { t } = useLanguage();
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  return (
    <Breadcrumb className="mb-8">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">{t("nav.home")}</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          {segments.length === 1 ? (
            <BreadcrumbPage>{t("nav.portfolio")}</BreadcrumbPage>
          ) : (
            <BreadcrumbLink asChild>
              <Link href="/portfolio">{t("nav.portfolio")}</Link>
            </BreadcrumbLink>
          )}
        </BreadcrumbItem>
        {segments.length > 1 && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>
                {t(`portfolio.projects.${segments[1]}.title`)}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}