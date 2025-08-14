'use client';

import {createContext, useContext} from 'react';
import type {ReactNode} from 'react';

type Locale = 'es' | 'da';
type Dict = Record<string, unknown>;
type Ctx = {locale: Locale; dict: Dict};

const I18nCtx = createContext<Ctx | null>(null);

export function I18nProvider({
  locale,
  dict,
  children
}: {
  locale: Locale;
  dict: Dict;
  children: ReactNode;
}) {
  return <I18nCtx.Provider value={{locale, dict}}>{children}</I18nCtx.Provider>;
}

export function useT(ns?: string) {
  const ctx = useContext(I18nCtx);
  if (!ctx) throw new Error('I18nProvider missing');

  const base: any = ns ? (ctx.dict as any)[ns] ?? {} : (ctx.dict as any);

  const t = (key: string) => {
    const val = key.split('.').reduce<any>((o, k) => (o == null ? undefined : o[k]), base);
    return typeof val === 'string' ? val : '';
  };

  return {t, locale: ctx.locale};
}

