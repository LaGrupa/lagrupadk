// src/middleware.ts
import createMiddleware from 'next-intl/middleware';
import {locales, defaultLocale} from './i18n';

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always' // or 'as-needed' if you want / for ES and /da for Danish
});

export const config = {
  matcher: ['/((?!_next|.*\\..*|api).*)']
};
