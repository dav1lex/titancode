"use client";

import { useLanguage } from "@/app/language-context";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { FormEvent, useState } from "react";

export default function ContactSection() {
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

  return (
    <section className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px] dark:bg-black">
      <div className="flex items-center justify-center py-12">
        <motion.div
          className="mx-auto grid w-[350px] gap-6"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">{t("contact.title")}</h1>
            <p className="text-balance text-muted-foreground">
              {t("contact.subtitle")}
            </p>
          </div>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">{t("contact.form.name")}</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">{t("contact.form.email")}</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="message">{t("contact.form.message")}</Label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>
            {responseMessage && (
              <p
                className={`text-sm ${status === "success"
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                  }`}
              >
                {responseMessage}
              </p>
            )}
            <Button
              type="submit"
              className="w-full"
              disabled={status === "loading"}
            >
              {status === "loading"
                ? t("contact.form.sending")
                : t("contact.form.submit")}
            </Button>
          </form>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or contact us directly
              </span>
            </div>
          </div>
          <div className="grid gap-2 text-center text-sm">
            <p className="text-muted-foreground">
              {t("contact.contactInfo.email")}
            </p>
            <p className="font-semibold">{t("contact.contactInfo.phone")}</p>
          </div>
        </motion.div>
      </div>
      <div className="hidden bg-muted lg:block">
        <motion.img
          src="https://images.unsplash.com/photo-1675185521859-0342ab38c2fb?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true }}
        />
      </div>
    </section>
  );
}