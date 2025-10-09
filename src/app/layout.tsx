import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "La Grupa DK",
  description: "Colectiva de mujeres migrantes en Dinamarca",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Default language for the whole site (overridden per-locale below)
    <html lang="es" suppressHydrationWarning>
      <body className="site">
        {children}
        <div id="emprendedoras-portal" />
      </body>
    </html>
  );
}
