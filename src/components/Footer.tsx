"use client";
import styles from "./Footer.module.css";
import { FaInstagram, FaLinkedin, FaSpotify, FaYoutube } from "react-icons/fa";
import { useT } from "@/i18n";
import { I18nLink as Link } from "@/i18nLink";
import { CookieSettingsLink } from "@/components/CookieSettingsLink";

export default function Footer() {
  const { t, locale } = useT();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Brand */}
        <div className={styles.brand}>
          <h4 className={`${styles.h4} ${styles.brandTitle}`}>La Grupa DK</h4>
          <p className={styles.desc}>{t("footer.desc") as string}</p>
        </div>

        {/* About */}
        <nav className={styles.links} aria-label={t("footer.about") as string}>
          <h4 className={styles.h4}>{t("footer.about") as string}</h4>
          <Link href={`/${locale}/quienes-somos`}>
            {t("footer.who") as string}
          </Link>
        </nav>

        {/* Privacy + Cookie settings */}
        <nav
          className={styles.links}
          aria-label={t("footer.privacy") as string}
        >
          <h4 className={styles.h4}>{t("footer.privacy") as string}</h4>
          <Link href={`/${locale}/privacy`}>
            {t("footer.policy") as string}
          </Link>
          <Link href={`/${locale}/contact`}>
            {t("footer.contact") as string}
          </Link>

          {/* Cookie settings button styled like a link */}
          <CookieSettingsLink className={styles.textButton} />
        </nav>

        {/* Social */}
        <div className={styles.links} aria-label={t("footer.social") as string}>
          <h4 className={styles.h4}>{t("footer.social") as string}</h4>
          <a
            className={styles.socialLink}
            href="https://www.linkedin.com/company/la-grupa-dk/posts/?feedView=all"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin
              className={`${styles.icon} ${styles.iconLinkedin}`}
              aria-hidden
            />
            <span className={styles.socialText}>LinkedIn</span>
          </a>
          <a
            className={styles.socialLink}
            href="https://open.spotify.com/user/314ias5k432olws2aepowjsezab4?si=FnPG9R7ISYajUp4wGqgzCA&nd=1&dlsi=73b2026eef1744be"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaSpotify
              className={`${styles.icon} ${styles.iconSpotify}`}
              aria-hidden
            />
            <span className={styles.socialText}>Spotify</span>
          </a>
          <a
            className={styles.socialLink}
            href="https://www.instagram.com/lagrupadk?igsh=enRmNm9pbm93YW05"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram
              className={`${styles.icon} ${styles.iconInstagram}`}
              aria-hidden
            />
            <span className={styles.socialText}>Instagram</span>
          </a>
          <a
            className={styles.socialLink}
            href="https://youtube.com/@lagrupadk?si=32IJiKYR_vth91Aw"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaYoutube
              className={`${styles.icon} ${styles.iconYoutube}`}
              aria-hidden
            />
            <span className={styles.socialText}>YouTube</span>
          </a>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>
          {t("footer.credit") as string}{" "}
          <a
            href="https://nialusby.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Nia
          </a>{" "}
          — Powered by Next.js
        </p>
      </div>
    </footer>
  );
}
