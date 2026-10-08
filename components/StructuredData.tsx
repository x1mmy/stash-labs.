const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Stash Labs',
  url: 'https://www.stashlabs.com.au',
  logo: 'https://www.stashlabs.com.au/android-chrome-512x512.png',
  description:
    'A small team of Sydney engineers. We sit with your team, learn how the work gets done, then connect the tools you already pay for.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Sydney',
    addressRegion: 'NSW',
    addressCountry: 'AU',
  },
  sameAs: [
    'https://www.linkedin.com/company/stash-labs/',
    'https://www.instagram.com/stash.labs/',
  ],
  email: 'team@stashlabs.com.au',
  foundingDate: '2024',
  numberOfEmployees: { '@type': 'QuantitativeValue', value: 3 },
  makesOffer: [
    {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'SoftwareApplication',
        name: 'TimeTally',
        applicationCategory: 'BusinessApplication',
        description: 'Digital timesheets for Australian businesses',
        url: 'https://www.timetally.com.au/',
        operatingSystem: 'Web',
      },
    },
    {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: 'Business systems audit and integration',
        description:
          'On-site systems audit, then a fixed-price build connecting the tools a small business already runs.',
        areaServed: 'AU',
      },
    },
  ],
};

export function StructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
