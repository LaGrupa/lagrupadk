"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  // Close on ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // Prevent body scroll when open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = open ? "hidden" : prev;
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  return (
    <header className={styles.header}>
      <nav className={styles.navbar} aria-label="Principal">
        {/* Logo */}
        <Link href="/" className={styles.logo} onClick={() => setOpen(false)}>
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
          <li><Link href="/quienes-somos">Quiénes Somos</Link></li>
          <li className={styles.hasSub}>
            <Link href="/que-hacemos">¿Qué hacemos?</Link>
          </li>
          <li><Link href="/publicaciones">Publicaciones</Link></li>
          <li><Link href="/recursero">Recursero</Link></li>
          <li><Link href="/faq">Preguntas Frecuentes</Link></li>
          <li><Link href="/contact">Contactanos</Link></li>
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

      {/* Mobile menu panel + backdrop */}
      <div
        className={`${styles.backdrop} ${open ? styles.show : ""}`}
        onClick={() => setOpen(false)}
      />
      <div
        id="mobile-menu"
        className={`${styles.mobile} ${open ? styles.open : ""}`}
      >
        <ul className={styles.mobileList} onClick={() => setOpen(false)}>
          <li><Link href="/quienes-somos">Quiénes Somos</Link></li>
          <li><Link href="/que-hacemos">¿Qué hacemos?</Link></li>
          <li><Link href="/publicaciones">Publicaciones</Link></li>
          <li><Link href="/recursero">Recursero</Link></li>
          <li><Link href="/faq">Preguntas Frecuentes</Link></li>
          <li><Link href="/contact">Contactanos</Link></li>
        </ul>
      </div>
    </header>
  );
}

