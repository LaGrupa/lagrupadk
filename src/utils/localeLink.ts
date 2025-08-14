// src/utils/localeLink.ts
export function withLocalePath(locale: string, path: string) {
  // Ensure there's no accidental double slash
  if (path.startsWith("/")) path = path.slice(1);
  return `/${locale}/${path}`;
}
