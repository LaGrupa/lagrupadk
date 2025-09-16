"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import styles from "./Navbar.module.css";
import { I18nLink as Link } from "../i18nLink";
import { useT } from "../i18n";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { t, locale } = useT("nav");
  const pathname = usePathname() || `/${locale}`;

  // Other locale
  const otherLocale = locale === "es" ? "da" : "es";

  // Strip leading locale from current path (e.g. /es/faq -> /faq, /da -> /)
  const switchPath = pathname.replace(/^\/(es|da)(?=\/|$)/, "") || "/";

  // Close on ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = open ? "hidden" : prev;
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <header className={styles.header}>
      <nav className={styles.navbar} aria-label="Principal">
        {/* Logo -> locale home */}
        <Link
          href="/"
          locale={locale}
          className={styles.logo}
          onClick={() => setOpen(false)}
        >
          <Image
            src="/logo.png"
            alt="La Grupa DK"
            width={60}
            height={60}
            className={styles.logoImage}
            priority
          />
        </Link>

        {/* Desktop menu */}
        <ul className={styles.menu}>
          <li>
            <Link href="/quienes-somos" locale={locale}>
              {t("who")}
            </Link>
          </li>
          <li className={styles.hasSub}>
            <Link href="/que-hacemos" locale={locale}>
              {t("what")}
            </Link>
          </li>
          <li>
            <Link href="/publicaciones" locale={locale}>
              {t("pubs")}
            </Link>
          </li>
          <li>
            <Link href="/recursero" locale={locale}>
              {t("resources")}
            </Link>
          </li>
          <li>
            <Link href="/faq" locale={locale}>
              {t("faq")}
            </Link>
          </li>
          <li>
            <Link href="/asociate" locale={locale}>
              {t("asociate") as string}
            </Link>
          </li>
          <li>
            <Link href="/contact" locale={locale}>
              {t("contact")}
            </Link>
          </li>

          {/* Locale switcher (preserves path via I18nLink) */}
          <li style={{ marginLeft: 12 }}>
            <Link href={switchPath} locale={otherLocale}>
              {otherLocale.toUpperCase()}
            </Link>
          </li>
        </ul>

        {/* Burger */}
        <button
          className={styles.burger}
          aria-label="Abrir menú"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(!open)}
        >
          <span className={styles.burgerBox}>
            <span className={styles.burgerInner} />
          </span>
        </button>
      </nav>

      {/* Backdrop */}
      <div
        className={`${styles.backdrop} ${open ? styles.show : ""}`}
        onClick={() => setOpen(false)}
      />

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`${styles.mobile} ${open ? styles.open : ""}`}
      >
        <ul className={styles.mobileList} onClick={() => setOpen(false)}>
          <li>
            <Link href="/quienes-somos" locale={locale}>
              {t("who")}
            </Link>
          </li>
          <li>
            <Link href="/que-hacemos" locale={locale}>
              {t("what")}
            </Link>
          </li>
          <li>
            <Link href="/publicaciones" locale={locale}>
              {t("pubs")}
            </Link>
          </li>
          <li>
            <Link href="/recursero" locale={locale}>
              {t("resources")}
            </Link>
          </li>
          <li>
            <Link href="/faq" locale={locale}>
              {t("faq")}
            </Link>
          </li>
          <li>
            <Link href="/asociate" locale={locale}>
              {t("asociate") as string}
            </Link>
          </li>
          <Link href="/contact" locale={locale}>
            {t("contact")}
          </Link>
          <li style={{ marginTop: 8 }}>
            <Link href={switchPath} locale={otherLocale}>
              {otherLocale.toUpperCase()}
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
