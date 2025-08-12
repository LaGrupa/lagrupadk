// src/i18n/index.ts
export const locales = ['es', 'da'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'es';

