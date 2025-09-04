'use client';

import Link from 'next/link';
import type { ComponentProps } from 'react';
import { usePathname } from 'next/navigation';
import { useT } from './i18n';

type Locale = 'es' | 'da';

type Props = Omit<ComponentProps<typeof Link>, 'href'> & {
  href: string;      // '', '/', '/contact', '/faq', etc.
  locale?: Locale;   // force a locale (used by the language switcher)
};

function stripLocalePrefix(path: string): string {
  // Remove a single leading /es or /da
  return path.replace(/^\/(es|da)(?=\/|$)/, '') || '/';
}

export function I18nLink({ href, locale: forcedLocale, ...rest }: Props) {
  const { locale } = useT();
  const pathname = usePathname() || '/';

  const target: Locale = forcedLocale ?? locale;

  // Base path: explicit href or current path
  const rawBase = href === '' ? pathname : href;

  // Normalize: strip any existing /es or /da
  const base = stripLocalePrefix(rawBase); // e.g. '/' or '/faq'

  // ✅ Always prefix with the target locale (Spanish too)
  const out = `/${target}${base === '/' ? '' : base}`;

  return <Link {...rest} href={out} />;
}
