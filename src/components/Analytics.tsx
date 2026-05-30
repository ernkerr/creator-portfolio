import Script from "next/script";
import { env } from "@/lib/env";

export function Analytics() {
  if (!env.GA_ID) return null;
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${env.GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${env.GA_ID}', { anonymize_ip: true });
        `}
      </Script>
    </>
  );
}
