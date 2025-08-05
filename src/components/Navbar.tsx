import Link from "next/link";
import Image from "next/image";
import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        {/* Logo */}
        <Link href="/" className={styles.logo}>
          <Image
            src="/logo.png" // path inside public folder
            alt="La Grupa DK"
            width={60}
            height={60}
            className={styles.logoImage}
          />
        </Link>

        {/* Menu */}
        <ul className={styles.menu}>
          <li><Link href="/quienes-somos">Quiénes Somos</Link></li>
          <li><Link href="/que-hacemos">¿Qué hacemos?</Link></li>
          <li><Link href="/recursos">Recursero</Link></li>
          <li><Link href="/faq">Preguntas Frecuentes</Link></li>
          <li><a href="/contact">Contáctanos</a></li>

        </ul>
      </nav>
    </header>
  );
}
