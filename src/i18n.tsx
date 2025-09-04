"use client";

import { createContext, useContext, useMemo, useCallback, ReactNode } from "react";

export type Locale = "es" | "da";
export type Dict = Record<string, unknown>;
type Ctx = { locale: Locale; dict: Dict };

const I18nCtx = createContext<Ctx | null>(null);

export function I18nProvider({
  locale,
  dict,
  children,
}: {
  locale: Locale;
  dict: Dict;
  children: ReactNode;
}) {
  return <I18nCtx.Provider value={{ locale, dict }}>{children}</I18nCtx.Provider>;
}

/** Dot-path getter: "a.b.c" → obj.a.b.c */
function getPath<T = unknown>(obj: unknown, path: string): T | undefined {
  if (!obj) return undefined;
  return path.split(".").reduce<any>((acc, key) => (acc == null ? undefined : acc[key]), obj) as
    | T
    | undefined;
}

/**
 * useT(ns?) returns:
 *  - t<T>(key): T | undefined
 *  - ts(key, fallback?): string
 *  - locale
 */
export function useT(ns?: string) {
  const ctx = useContext(I18nCtx);
  if (!ctx) throw new Error("I18nProvider missing");

  // ✅ resolve dotted namespaces like "home.cards"
  const base = useMemo<Dict | undefined>(
    () => (ns ? (getPath<Dict>(ctx.dict, ns) as Dict | undefined) : (ctx.dict as Dict)),
    [ctx.dict, ns]
  );

  const t = useCallback(<T = unknown>(key: string) => getPath<T>(base, key), [base]);

  const ts = useCallback(
    (key: string, fallback = ""): string => {
      const val = getPath<unknown>(base, key);
      return typeof val === "string" ? val : fallback;
    },
    [base]
  );

  return { t, ts, locale: ctx.locale };
}



