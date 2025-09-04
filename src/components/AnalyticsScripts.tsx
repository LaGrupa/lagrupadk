import Script from "next/script";

export default function AnalyticsScripts({ enabled }: { enabled: boolean }) {
  if (!enabled) return null;

  const id = process.env.NEXT_PUBLIC_GA_ID; // e.g. "G-XXXXXXX"
  if (!id) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${id}`} strategy="afterInteractive" />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${id}', { anonymize_ip: true });
        `}
      </Script>
    </>
  );
}
