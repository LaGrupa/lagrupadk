import './globals.css';
import type {Metadata} from 'next';

export const metadata: Metadata = {
  title: 'La Grupa DK',
  description: 'Colectiva de mujeres migrantes en Dinamarca'
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}


