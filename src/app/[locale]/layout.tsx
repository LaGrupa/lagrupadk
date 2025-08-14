import '../globals.css';
import type {ReactNode} from 'react';
import {I18nProvider} from '@/i18n';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export function generateStaticParams() { return [{locale:'es'},{locale:'da'}]; }

export default async function LocaleLayout({
  children, params
}:{children:ReactNode; params:Promise<{locale:'es'|'da'}>}) {
  const {locale} = await params;
  const dict = (await import(`@/messages/${locale}.json`)).default;
  return (
    <html lang={locale}>
      <body className="site">
        <I18nProvider locale={locale} dict={dict}>
          <Navbar />
          <main className="site-main">{children}</main>
          <Footer />
        </I18nProvider>
      </body>
    </html>
  );
}









 

