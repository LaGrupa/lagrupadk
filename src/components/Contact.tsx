"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./Contact.module.css";
import { useT } from "@/i18n";

export default function Contact() {
  const { t } = useT("contact");

  // Helper: always return a string
  const s = (key: string) => (t(key) as string | undefined) ?? "";

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(s("success"));
    setForm({ name: "", email: "", message: "" });
  };

  const requiredText = s("fields.required");

  return (
    <section className={styles.section} aria-labelledby="contact-title">
      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.leftInner}>
            <h2 id="contact-title" className={styles.title}>{s("title")}</h2>
            <p className={styles.lead}>{s("lead")}</p>

            {/* Render form only on client to avoid extension-injected attrs at SSR */}
            {mounted && (
              <form className={styles.form} onSubmit={onSubmit}>
                <label className={styles.label} htmlFor="name">
                  {s("fields.name")}
                  {requiredText ? (
                    <span className={styles.req}> {requiredText}</span>
                  ) : null}
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
                  {s("fields.email")}
                  {requiredText ? (
                    <span className={styles.req}> {requiredText}</span>
                  ) : null}
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
                  {s("fields.message")}
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
                  {s("submit")}
                </button>
              </form>
            )}
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.imageWrap}>
            <Image
              src="/site/contact.jpg"
              alt={s("imageAlt") || s("title")}
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



