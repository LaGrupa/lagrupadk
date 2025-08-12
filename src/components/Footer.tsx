import styles from "./Footer.module.css";
import { FaLinkedin, FaSpotify } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Brand */}
        <div className={styles.brand}>
          <p className={styles.name}>La Grupa DK</p>
          <p className={styles.desc}>
            Colectiva de mujeres migrantes en Dinamarca que se organiza para crear
            comunidad, acompañarse mutuamente y compartir recursos, saberes y cuidados.
          </p>
        </div>

        {/* Columns */}
        <nav className={styles.links} aria-label="Acerca de">
          <h4>Acerca de</h4>
          <a href="/quienes-somos">Quiénes somos</a>
        </nav>

        <nav className={styles.links} aria-label="Privacidad">
          <h4>Privacidad</h4>
          <a href="#">Política de privacidad</a>
          <a href="/contacto">Contacto</a>
        </nav>

        {/* Social */}
        <div className={styles.links} aria-label="Redes sociales">
          <h4>Social</h4>
          <a
            className={`${styles.socialLink} ${styles.linkedin}`}
            href="https://www.linkedin.com/company/la-grupa-dk/posts/?feedView=all"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin className={styles.icon} aria-hidden />
            LinkedIn
          </a>
          <a
            className={`${styles.socialLink} ${styles.spotify}`}
            href="https://open.spotify.com/user/314ias5k432olws2aepowjsezab4?si=FnPG9R7ISYajUp4wGqgzCA&nd=1&dlsi=73b2026eef1744be"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaSpotify className={styles.icon} aria-hidden />
            Spotify
          </a>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>
          Designed with 💜 and feminist power by{" "}
          <a href="https://nialusby.vercel.app" target="_blank" rel="noopener noreferrer">
            Nia
          </a>{" "}
          — Powered by Next.js
        </p>
      </div>
    </footer>
  );
}

