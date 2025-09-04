"use client";

import { useEffect, useState } from "react";   // ⬅ add useEffect
import Image from "next/image";
import styles from "./Contact.module.css";
import { useT } from "@/i18n";

export default function Contact() {
  const { t } = useT("contact");

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [mounted, setMounted] = useState(false);          // ⬅ add
  useEffect(() => setMounted(true), []);                  // ⬅ add

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(t("success"));
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section className={styles.section} aria-labelledby="contact-title">
      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.leftInner}>
            <h2 id="contact-title" className={styles.title}>{t("title")}</h2>
            <p className={styles.lead}>{t("lead")}</p>

            {/* Render form only on client to avoid extension-injected attrs at SSR */}
            {mounted && (
              <form className={styles.form} onSubmit={onSubmit}>
                <label className={styles.label} htmlFor="name">
                  {t("fields.name")}
                  {t("fields.required") && (
                    <> <span className={styles.req}>{t("fields.required")}</span></>
                  )}
                </label>
                <input
                  id="name"
                  name="name"
                  className={styles.input}
                  value={form.name}
                  onChange={onChange}
                  required
                  autoComplete="name"
                  inputMode="text"
                />

                <label className={styles.label} htmlFor="email">
                  {t("fields.email")}
                  {t("fields.required") && (
                    <> <span className={styles.req}>{t("fields.required")}</span></>
                  )}
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  className={styles.input}
                  value={form.email}
                  onChange={onChange}
                  required
                  autoComplete="email"
                  inputMode="email"
                />

                <label className={styles.label} htmlFor="message">
                  {t("fields.message")}
                </label>
                <textarea
                  id="message"
                  name="message"
                  className={styles.textarea}
                  rows={6}
                  value={form.message}
                  onChange={onChange}
                  required
                />

                <button type="submit" className={styles.button}>
                  {t("submit")}
                </button>
              </form>
            )}
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.imageWrap}>
            <Image
              src="/site/contact.jpg"
              alt={t("imageAlt") || t("title")}
              fill
              priority
              sizes="(max-width: 899px) 100vw, 48vw"
              className={styles.image}
            />
          </div>
        </div>
      </div>
    </section>
  );
}



