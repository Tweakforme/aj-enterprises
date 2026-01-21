import { Metadata } from 'next';

const siteConfig = {
  name: 'ORCA Enterprises Inc.',
  description: 'Premium web development and e-commerce solutions in Calgary, Alberta. Custom Shopify stores, Next.js applications, and conversion-focused design.',
  url: 'https://orcaenterprises.ca',
  ogImage: '/og-image.jpg',
  links: {
    twitter: 'https://twitter.com/orcaenterprises',
    linkedin: 'https://linkedin.com/company/orca-enterprises',
    github: 'https://github.com/orcaenterprises',
  },
};

export function generateMetadata({
  title,
  description,
  image,
  path = '',
  keywords = [],
}: {
  title: string;
  description: string;
  image?: string;
  path?: string;
  keywords?: string[];
}): Metadata {
  const url = `${siteConfig.url}${path}`;
  const ogImage = image || siteConfig.ogImage;

  return {
    title: `${title} | ${siteConfig.name}`,
    description,
    keywords: [
      'web development Calgary',
      'Shopify development',
      'e-commerce solutions',
      'Next.js development',
      'custom web applications',
      'Calgary web developer',
      ...keywords,
    ],
    authors: [{ name: siteConfig.name }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: 'website',
      locale: 'en_CA',
      url,
      title,
      description,
      siteName: siteConfig.name,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
      creator: '@orcaenterprises',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export { siteConfig };
