export const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Stash Labs',
  url: 'https://www.stashlabs.com.au',
  logo: 'https://www.stashlabs.com.au/android-chrome-512x512.png',
  description:
    'Stash Labs finds the hours Australian businesses lose to admin, and gets them back. Hours Check is a free written report. TimeTally is digital timesheets.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Sydney',
    addressRegion: 'NSW',
    addressCountry: 'AU',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    email: 'team@stashlabs.com.au',
    areaServed: 'AU',
    availableLanguage: ['English'],
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
        description: 'Digital timesheets for Australian businesses.',
        url: 'https://www.timetally.com.au/',
        operatingSystem: 'Web',
      },
    },
    {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: 'Hours Check',
        description:
          'A free on-site or video visit that ends with a written report on the hours a business loses to admin.',
        areaServed: 'AU',
      },
    },
  ],
};
