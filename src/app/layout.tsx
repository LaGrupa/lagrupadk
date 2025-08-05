import "./globals.css";
import type { Metadata } from "next";
import Navbar from "../components/Navbar";
;

export const metadata: Metadata = {
  title: "La Grupa DK",
  description: "Comunidad Feminista de Mujeres Migrantes",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
