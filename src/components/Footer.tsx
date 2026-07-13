import styles from "./Footer.module.css";
import {
  FaInstagram,
  FaLinkedin,
  FaSpotify,
  FaYoutube,
  FaFacebook,
} from "react-icons/fa";
import { I18nLink as Link } from "@/i18nLink";
import { client } from "@/sanity/lib/client";

type SocialPlatform =
  | "linkedin"
  | "spotify"
  | "instagram"
  | "youtube"
  | "facebook";

type SocialLink = {
  platform: SocialPlatform;
  label: string;
  href: string;
};

type FooterDoc = {
  brandTitle?: string;
  description?: string;
  cvr?: string;
  socialLinks?: SocialLink[];
};

const query = `
*[_type == "footerSettings" && locale == $locale][0]{
  brandTitle,
  description,
  cvr,
  socialLinks[]{
    platform,
    label,
    href
  }
}
`;

const copy = {
  es: {
    about: "Sobre nosotras",
    who: "Quiénes somos",
    what: "Qué hacemos",
    privacy: "Privacidad",
    policy: "Política de privacidad",
    contact: "Contacto",
    social: "Redes sociales",
    credit: "Diseñado con 💜 y fuerza feminista por",
    fallbackDesc:
      "Colectiva de mujeres migrantes en Dinamarca que se organiza para tejer comunidad, acompañarnos y compartir recursos, saberes y cuidados.",
  },
  da: {
    about: "Om os",
    who: "Hvem vi er",
    what: "Hvad vi gør",
    privacy: "Privatliv",
    policy: "Privatlivspolitik",
    contact: "Kontakt",
    social: "Sociale medier",
    credit: "Designet med 💜 og feministisk styrke af",
    fallbackDesc:
      "Kollektiv af migrantkvinder i Danmark, som organiserer sig for at skabe fællesskab, støtte hinanden og dele ressourcer, viden og omsorg.",
  },
} as const;

function getIcon(platform: SocialPlatform) {
  switch (platform) {
    case "linkedin":
      return (
        <FaLinkedin
          className={`${styles.icon} ${styles.iconLinkedin}`}
          aria-hidden
        />
      );

    case "spotify":
      return (
        <FaSpotify
          className={`${styles.icon} ${styles.iconSpotify}`}
          aria-hidden
        />
      );

    case "instagram":
      return (
        <FaInstagram
          className={`${styles.icon} ${styles.iconInstagram}`}
          aria-hidden
        />
      );

    case "youtube":
      return (
        <FaYoutube
          className={`${styles.icon} ${styles.iconYoutube}`}
          aria-hidden
        />
      );

    case "facebook":
      return (
        <FaFacebook
          className={`${styles.icon} ${styles.iconFacebook}`}
          aria-hidden
        />
      );

    default:
      return null;
  }
}

export default async function Footer({ locale }: { locale: "es" | "da" }) {
  const t = copy[locale];
  const data: FooterDoc | null = await client.fetch(query, { locale });

  const brandTitle = data?.brandTitle || "La Grupa DK";
  const description = data?.description || t.fallbackDesc;
  const cvr = data?.cvr || "45871096";

  const socialLinks: SocialLink[] = data?.socialLinks?.length
    ? data.socialLinks
    : [
        {
          platform: "linkedin",
          label: "LinkedIn",
          href: "https://www.linkedin.com/company/la-grupa-dk/posts/?feedView=all",
        },
        {
          platform: "spotify",
          label: "Spotify",
          href: "https://open.spotify.com/user/314ias5k432olws2aepowjsezab4?si=FnPG9R7ISYajUp4wGqgzCA&nd=1&dlsi=73b2026eef1744be",
        },
        {
          platform: "instagram",
          label: "Instagram",
          href: "https://www.instagram.com/lagrupadk?igsh=enRmNm9pbm93YW05",
        },
        {
          platform: "youtube",
          label: "YouTube",
          href: "https://youtube.com/@lagrupadk?si=32IJiKYR_vth91Aw",
        },
        {
          platform: "facebook",
          label: "Facebook",
          href: "https://www.facebook.com/",
        },
      ];

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <h4 className={`${styles.h4} ${styles.brandTitle}`}>{brandTitle}</h4>
          <p className={styles.desc}>{description}</p>
        </div>

        <nav className={styles.links} aria-label={t.about}>
          <h4 className={styles.h4}>{t.about}</h4>
          <Link href={`/${locale}/quienes-somos`}>{t.who}</Link>
          <Link href={`/${locale}/que-hacemos`}>{t.what}</Link>
          <p>CVR: {cvr}</p>
        </nav>

        <nav className={styles.links} aria-label={t.privacy}>
          <h4 className={styles.h4}>{t.privacy}</h4>
          <Link href={`/${locale}/privacy`}>{t.policy}</Link>
          <Link href={`/${locale}/contact`}>{t.contact}</Link>
        </nav>

        <div className={styles.links} aria-label={t.social}>
          <h4 className={styles.h4}>{t.social}</h4>

          {socialLinks.map((item) => (
            <a
              key={`${item.platform}-${item.href}`}
              className={styles.socialLink}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {getIcon(item.platform)}
              <span className={styles.socialText}>{item.label}</span>
            </a>
          ))}
        </div>
      </div>

      <div className={styles.bottom}>
        <p>
          {t.credit}{" "}
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
