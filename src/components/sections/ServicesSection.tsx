"use client";

import { useMemo, useState, type ReactElement } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Bot,
  Code,
  LifeBuoy,
  LineChart,
  Search,
  ShoppingCart,
} from "lucide-react";

import { useLanguage } from "@/app/language-context";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

type ServiceKey =
  | "webDev"
  | "automation"
  | "seo"
  | "ecommerce"
  | "consulting"
  | "maintenance";

type Service = {
  key: ServiceKey;
  icon: ReactElement;
};

export default function ServicesSection() {
  const { t, language } = useLanguage();
  const [selectedKey, setSelectedKey] = useState<ServiceKey | null>(null);

  const services: Service[] = useMemo(
    () => [
      { key: "webDev", icon: <Code className="size-6" /> },
      { key: "automation", icon: <Bot className="size-6" /> },
      { key: "seo", icon: <Search className="size-6" /> },
      { key: "ecommerce", icon: <ShoppingCart className="size-6" /> },
      { key: "consulting", icon: <LineChart className="size-6" /> },
      { key: "maintenance", icon: <LifeBuoy className="size-6" /> },
    ],
    []
  );

  const selectedService = selectedKey
    ? services.find((s) => s.key === selectedKey) ?? null
    : null;

  return (
    <section className="relative py-24 sm:py-32 bg-background overflow-hidden">
      {/* Animated background elements */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.h2
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {t("services.title")}
          </motion.h2>
          <motion.p
            className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            {t("services.subtitle")}
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, idx) => (
            <motion.div
              key={service.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.6 }}
              className="group relative h-full"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-cyan-500/0 group-hover:from-blue-500/5 group-hover:to-cyan-500/5 rounded-2xl transition duration-500" />
              <div className="relative p-6 h-full border border-border rounded-2xl bg-card/50 backdrop-blur group-hover:border-primary/50 transition-all duration-300 flex flex-col">
                {/* Icon + Title */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-foreground/5 group-hover:bg-primary/10 text-foreground group-hover:text-primary transition-all duration-300 flex-shrink-0">
                    {service.icon}
                  </div>
                  <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                    {t(`services.${service.key}.title`)}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-sm leading-6 text-muted-foreground mb-6 flex-1">
                  {t(`services.${service.key}.description`)}
                </p>

                {/* Button */}
                <div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={() => setSelectedKey(service.key)}
                  >
                    {t("services.viewDetails")}
                    <ArrowRight className="size-4 ml-2" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Premium Modal Dialog */}
      {selectedService && (
        <Dialog open={!!selectedService} onOpenChange={() => setSelectedKey(null)}>
          <DialogContent className="sm:max-w-xl p-8 gap-6">
            {/* Header with icon */}
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg border border-border/50 bg-background text-foreground flex-shrink-0">
                  {selectedService.icon}
                </div>
                <div className="flex-1">
                  <DialogTitle className="text-2xl">
                    {t(`services.${selectedService.key}.title`)}
                  </DialogTitle>
                  <DialogDescription className="text-base mt-2">
                    {t(`services.${selectedService.key}.description`)}
                  </DialogDescription>
                </div>
              </div>
            </div>

            {/* Long description */}
            <div className="py-4 border-t border-b border-border">
              <p className="text-muted-foreground leading-7">
                {t(`services.${selectedService.key}.longDescription`)}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild className="flex-1 font-semibold">
                <Link href={`/${language}/calculate-estimate`}>
                  {t("services.ctaPrimary")}
                </Link>
              </Button>
              <Button asChild variant="outline" className="flex-1 font-semibold">
                <Link href={`/${language}/contact`}>
                  {t("services.ctaSecondary")}
                </Link>
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </section>
  );
}
