import Script from 'next/script';

export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'ORCA Enterprises Inc.',
    legalName: 'ORCA Enterprises Inc.',
    url: 'https://orcaenterprises.ca',
    logo: 'https://orcaenterprises.ca/logo.jpg',
    foundingDate: '2020',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-250-299-5013',
      contactType: 'customer service',
      email: 'aj@orcaenterprises.ca',
      areaServed: 'CA',
      availableLanguage: 'English',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Calgary',
      addressRegion: 'AB',
      addressCountry: 'CA',
    },
    sameAs: [
      'https://linkedin.com/company/orca-enterprises',
      'https://github.com/orcaenterprises',
      'https://twitter.com/orcaenterprises',
    ],
  };

  return (
    <Script
      id="organization-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function LocalBusinessSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://orcaenterprises.ca/#localbusiness',
    name: 'ORCA Enterprises Inc.',
    image: 'https://orcaenterprises.ca/logo.jpg',
    telephone: '+1-250-299-5013',
    email: 'aj@orcaenterprises.ca',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Calgary',
      addressRegion: 'AB',
      addressCountry: 'CA',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 51.0447,
      longitude: -114.0719,
    },
    url: 'https://orcaenterprises.ca',
    priceRange: '$$',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '17:00',
      },
    ],
  };

  return (
    <Script
      id="local-business-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function WebsiteSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'ORCA Enterprises Inc.',
    url: 'https://orcaenterprises.ca',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://orcaenterprises.ca/search?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <Script
      id="website-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ServiceSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Web Development',
    provider: {
      '@type': 'Organization',
      name: 'ORCA Enterprises Inc.',
      url: 'https://orcaenterprises.ca',
    },
    areaServed: {
      '@type': 'Country',
      name: 'Canada',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Web Development Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Starter Website',
            description: 'Professional 4-5 page website for small businesses',
            offers: {
              '@type': 'Offer',
              price: '500',
              priceCurrency: 'USD',
            },
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Commerce Store',
            description: 'Complete online store with payment processing',
            offers: {
              '@type': 'Offer',
              price: '800',
              priceCurrency: 'USD',
            },
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Custom Solution',
            description: 'Custom web applications with advanced features',
            offers: {
              '@type': 'Offer',
              price: '1200',
              priceCurrency: 'USD',
            },
          },
        },
      ],
    },
  };

  return (
    <Script
      id="service-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BreadcrumbSchema({ items }: { items: Array<{ name: string; url: string }> }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <Script
      id="breadcrumb-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
