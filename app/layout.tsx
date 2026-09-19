import type { Metadata } from "next";
import { Epilogue, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { StructuredData } from "@/components/StructuredData";
import { Intro } from "@/components/Intro";

const epilogue = Epilogue({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-epilogue",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const description =
  "Stash Labs is a three-person software studio in Sydney. We build products for Australian small businesses, and websites for the businesses that need one properly.";

export const metadata: Metadata = {
  title: "Stash Labs | Software for the businesses that keep the lights on",
  description,
  keywords: [
    "Stash Labs",
    "TimeTally",
    "Australian SaaS",
    "SMB software",
    "payroll software",
    "Sydney software studio",
    "small business websites",
  ],
  authors: [{ name: "Stash Labs" }],
  creator: "Stash Labs",
  publisher: "Stash Labs",
  metadataBase: new URL("https://www.stashlabs.com.au"),
  alternates: { canonical: "/" },
  openGraph: {
    title: "Stash Labs | Software for the businesses that keep the lights on",
    description,
    url: "https://www.stashlabs.com.au",
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
    title: "Stash Labs | Software for the businesses that keep the lights on",
    description,
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
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    other: [{ rel: "icon", url: "/favicon.ico" }],
  },
  manifest: "/site.webmanifest",
};

// Light ("paper") is the default for everyone; only an explicit saved choice
// switches it. Runs before paint so that choice never flashes paper first.
const themeBoot = `(function(){try{var d=document.documentElement,k=localStorage.getItem('sl-theme')==='ink';d.setAttribute('data-theme',k?'ink':'paper');d.classList.add(k?'dark':'light');if(!sessionStorage.getItem('sl-seen')){sessionStorage.setItem('sl-seen','1');d.setAttribute('data-intro','');}}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html
      lang="en-AU"
      data-theme="paper"
      className={`${epilogue.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBoot }} />
        <StructuredData />
      </head>
      <body className="overflow-x-hidden font-sans">
        <Intro />
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

        {children}
      </body>
    </html>
  );
}
