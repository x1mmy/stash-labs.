import type { Metadata } from "next";
import "./globals.css";
import { CursorTracker } from "@/components/CursorTracker";
import { StructuredData } from "@/components/StructuredData";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Stash Labs | Building the tech we wished existed",
  description: "Three students who code, solving real problems for Australian small businesses. We build LifeCycle and TimeTally - practical SaaS tools for Australian SMBs.",
  keywords: ["Stash Labs", "LifeCycle", "TimeTally", "Australian SaaS", "SMB software", "expiry tracking", "payroll software", "Sydney startups"],
  authors: [{ name: "Stash Labs" }],
  creator: "Stash Labs",
  publisher: "Stash Labs",
  metadataBase: new URL("https://stashlabs.com.au"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Stash Labs | Building the tech we wished existed",
    description: "Three students who code, solving real problems for Australian small businesses.",
    url: "https://stashlabs.com.au",
    siteName: "Stash Labs",
    locale: "en_AU",
    type: "website",
    images: [
      {
        url: "/android-chrome-512x512.png",
        width: 512,
        height: 512,
        alt: "Stash Labs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Stash Labs | Building the tech we wished existed",
    description: "Three students who code, solving real problems for Australian small businesses.",
    images: ["/android-chrome-512x512.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { rel: "icon", url: "/favicon.ico" },
    ],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Epilogue:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <StructuredData />
      </head>
      <body className="font-epilogue antialiased bg-neutral-950 text-neutral-100">
        {/* Google Analytics 4 */}
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script
              id="ga-script"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_ID}');
                `,
              }}
            />
          </>
        )}

        {/* Google Tag Manager - noscript */}
        {GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}

        {/* Google Tag Manager - script */}
        {GTM_ID && (
          <Script
            id="gtm-script"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${GTM_ID}');
              `,
            }}
          />
        )}

        <CursorTracker />
        {children}
      </body>
    </html>
  );
}