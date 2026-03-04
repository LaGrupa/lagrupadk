"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "@/components/Contact.module.css";
import { useT } from "@/i18n";
import { urlFor } from "@/sanity/lib/image";

export default function ContactClient({
  title,
  lead,
  image,
  imageAlt,
}: {
  title: string;
  lead: string;
  image?: any;
  imageAlt?: string | null;
}) {
  const { t } = useT("contact");

  const s = (key: string) => (t(key) as string | undefined) ?? "";

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [mounted, setMounted] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );

  useEffect(() => setMounted(true), []);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          hp: "",
        }),
      });

      if (!res.ok) throw new Error("Network error");

      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  const requiredText = s("fields.required");

  const imageUrl = image ? urlFor(image).width(1200).url() : "/site/contact.jpg";

  return (
    <section className={styles.section} aria-labelledby="contact-title">
      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.leftInner}>
            <h2 id="contact-title" className={styles.title}>
              {title}
            </h2>
            <p className={styles.lead}>{lead}</p>

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

                <button
                  type="submit"
                  className={styles.button}
                  disabled={status === "loading"}
                >
                  {status === "loading"
                    ? s("sending") || "Sending..."
                    : s("submit")}
                </button>

                {status === "success" && (
                  <p className={styles.success}>
                    {s("success") || "? Message sent!"}
                  </p>
                )}
                {status === "error" && (
                  <p className={styles.error}>
                    {s("error") || "? Error sending message"}
                  </p>
                )}
              </form>
            )}
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.imageWrap}>
            <Image
              src={imageUrl}
              alt={(imageAlt ?? "").trim() || title}
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
