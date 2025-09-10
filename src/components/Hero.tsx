'use client';

import Image from 'next/image';
import styles from './Hero.module.css';
import { I18nLink as Link } from '../i18nLink';
import { useT } from '../i18n';

export default function Hero() {
  const { t } = useT('hero');

  const alt   = (t('alt') as string | undefined)   ?? 'La Grupa';
  const title = (t('title') as string | undefined) ?? '';
  const lead  = (t('lead') as string | undefined)  ?? '';
  const cta   = (t('cta') as string | undefined)   ?? '';

  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.inner}>
        {/* Media */}
        <div className={styles.media}>
          <Image
            src="/site/hero.jpg"
            alt={alt}
            fill
            priority
            sizes="(max-width: 599px) 100vw, (max-width: 1023px) 50vw, 640px"
            className={styles.img}
          />
        </div>

        {/* Content */}
        <div className={styles.content}>
          <h2 id="hero-title" className={styles.title}>{title}</h2>
          <p className={styles.lead}>
            <strong>La Grupa</strong> {lead}
          </p>
          <Link href="/quienes-somos" className={styles.button} aria-label={cta}>
            {cta}
          </Link>
        </div>
      </div>
    </section>
  );
}







