'use client';

export function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Stash Labs",
    "url": "https://stashlabs.com",
    "logo": "https://stashlabs.com/android-chrome-512x512.png",
    "description": "Three students who code, solving real problems for Australian small businesses. We build LifeCycle and TimeTally - practical SaaS tools for Australian SMBs.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Sydney",
      "addressRegion": "NSW",
      "addressCountry": "AU"
    },
    "sameAs": [
      "https://www.linkedin.com/company/stash-labs/",
      "https://www.instagram.com/stash.labs/"
    ],
    "email": "team@stashlabs.com",
    "foundingDate": "2024",
    "founders": [
      {
        "@type": "Person",
        "name": "Stash Labs Team"
      }
    ],
    "makesOffer": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "SoftwareApplication",
          "name": "LifeCycle",
          "applicationCategory": "BusinessApplication",
          "description": "Digital expiry tracking for retailers, pharmacies, and cafes",
          "url": "https://www.lifecycle.cloud/",
          "operatingSystem": "Web"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "SoftwareApplication",
          "name": "TimeTally",
          "applicationCategory": "BusinessApplication",
          "description": "Payroll software made simple for Australian businesses",
          "url": "https://www.timetally.com.au/",
          "operatingSystem": "Web"
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
