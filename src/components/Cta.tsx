'use client';

import Image from 'next/image';
import styles from './Cta.module.css';
import {useT} from '../i18n';
import {I18nLink as Link} from '../i18nLink';

export default function Cta() {
  const {t} = useT('cta');
  const [l1, l2] = t('title').split('\n');

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Text */}
        <div className={styles.text}>
          <h3>
            {l1}
            {l2 ? (<><br />{l2}</>) : null}
          </h3>
          <ul className={styles.list}>
            <li>{t('b1')}</li>
            <li>{t('b2')}</li>
            <li>{t('b3')}</li>
          </ul>
          <Link className={`${styles.button} u-btnWideMobile`} href="/contact">
            {t('button')}
          </Link>
        </div>

        {/* Image */}
        <div className={styles.imageWrap}>
          <Image
            src="/site/cta.jpg"
            alt={t('imgAlt')}
            fill
            sizes="(max-width: 899px) 100vw, 44vw"
            className={styles.image}
            priority={false}
          />
        </div>
      </div>
    </section>
  );
}








