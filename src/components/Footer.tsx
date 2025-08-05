import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Left */}
        <div className={styles.brand}>
          <p className={styles.name}>La Grupa DK</p>
          <p className={styles.desc}>
            Colectiva de mujeres migrantes en Dinamarca que se organiza para crear
            comunidad, acompañarse mutuamente y compartir recursos, saberes y cuidados.
          </p>
        </div>

        {/* Links */}
        <div className={styles.links}>
          <h4>Acerca de</h4>
          <a href="#">Equipo</a>
          <a href="#">Historial</a>
        </div>

        <div className={styles.links}>
          <h4>Privacidad</h4>
          <a href="#">Política de privacidad</a>
          <a href="#">Contacto</a>
        </div>

        {/* Social */}
        <div className={styles.links}>
          <h4>Social</h4>
          <a href="#">LinkedIn</a>
          <a href="#">Spotify</a>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>Designed with ❤️ — Powered by Next.js</p>
      </div>
    </footer>
  );
}
