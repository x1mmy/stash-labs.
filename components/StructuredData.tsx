const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Stash Labs',
  url: 'https://www.stashlabs.com.au',
  logo: 'https://www.stashlabs.com.au/android-chrome-512x512.png',
  description:
    'A three-person software studio in Sydney building products for Australian small businesses, and websites for the businesses that need one properly.',
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
        description: 'Payroll software made simple for Australian businesses',
        url: 'https://www.timetally.com.au/',
        operatingSystem: 'Web',
      },
    },
    {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: 'Website design and build',
        description:
          'Fast, properly built websites for Australian small businesses.',
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
