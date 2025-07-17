"use client";

import { useLanguage } from "@/app/language-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { FormEvent, useState } from "react";

export default function ContactPage() {
  const { t } = useLanguage();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [responseMessage, setResponseMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setResponseMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (res.ok) {
        setStatus("success");
        setResponseMessage(t("contact.form.successMessage"));
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setStatus("error");
        setResponseMessage(t("contact.form.errorMessage"));
      }
    } catch {
      setStatus("error");
      setResponseMessage(t("contact.form.errorMessage"));
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: t("contactPage.emailLabel"),
      value: t("contactPage.email"),
      href: `mailto:${t("contactPage.email")}`,
    },
    {
      icon: Phone,
      label: t("contactPage.phoneLabel"),
      value: t("contactPage.phone"),
      href: `tel:${t("contactPage.phone")}`,
    },
    {
      icon: MapPin,
      label: t("contactPage.addressTitle"),
      value: `${t("contactPage.addressLine1")}, ${t(
        "contactPage.addressLine2"
      )}`,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-16 sm:py-24 lg:py-32 min-h-[calc(100vh-9rem)]">
      <div className="grid lg:grid-cols-2 lg:gap-16 ">
        <motion.div
          className="flex flex-col justify-center"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl bg-clip-text text-transparent bg-gradient-to-b from-gray-900 to-gray-600 dark:from-white dark:to-gray-300">
            {t("contact.title")}
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            {t("contact.subtitle")}
          </p>
          <Card className="mt-10 bg-transparent border-0 shadow-none">
            <CardContent className="p-0 space-y-6">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={item.label}
                  className="flex items-start gap-x-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                >
                  <div className="flex-shrink-0">
                    <item.icon
                      className="h-6 w-6 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      {item.label}
                    </h3>
                    <dd className="mt-1 text-base text-gray-600 dark:text-gray-400">
                      {item.href ? (
                        <a
                          className="hover:text-gray-900 dark:hover:text-white transition-colors"
                          href={item.href}
                        >
                          {item.value}
                        </a>
                      ) : (
                        item.value
                      )}
                    </dd>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          className="mt-16 lg:mt-0 bg-"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Card className="bg-white/50 dark:bg-black/50 backdrop-blur-lg border rounded-2xl shadow-lg py-3">
            <CardHeader>
              <CardTitle className="text-2xl font-bold tracking-tight text-center">
                {t("contact.form.title")}
              </CardTitle>
              <CardDescription className="text-center">
                {t("contact.form.description")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">{t("contact.form.name")}</Label>
                  <Input id="name" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">{t("contact.form.email")}</Label>
                  <Input id="email" type="email" placeholder="mail@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">{t("contact.form.message")}</Label>
                  <Textarea id="message" placeholder={t("contact.form.messagePlaceholder")} value={message} onChange={(e) => setMessage(e.target.value)} required />
                </div>
                {responseMessage && (
                  <p className={`text-sm font-medium ${status === 'success' ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'}`}>
                    {responseMessage}
                  </p>
                )}
                <Button size="lg" type="submit" disabled={status === 'loading'} className="w-full group">
                  {status === 'loading' ? t("contact.form.sending") : t("contact.form.submit")}
                  {status !== 'loading' && <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}