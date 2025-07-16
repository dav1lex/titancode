"use client";

import { useLanguage } from "@/app/language-context";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FaqSection() {
  const { t } = useLanguage();
  const faqKeys = [
    "priceInclude",
    "beginnerStart",
    "hostingIncluded",
    "renewalFees",
    "quality",
    "ssl",
    "cms",
    "customization",
  ];

  return (
    <section className="py-16 sm:py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold tracking-tight text-center">
          {t("faq.title")}
        </h2>
        <div className="mt-10 max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqKeys.map((key) => {
              return (
                <AccordionItem value={key} key={key}>
                  <AccordionTrigger className="text-left">{t(`faq.questions.${key}.question`)}</AccordionTrigger>
                  <AccordionContent className="prose prose-lg dark:prose-invert max-w-none">
                    {t(`faq.questions.${key}.answer`)}
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      </div>
    </section>
  );
}