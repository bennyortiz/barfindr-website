import { Metadata } from 'next';

/**
 * Generate metadata for a page
 * 
 * This utility helps create consistent metadata across the site
 * for better SEO performance.
 */
export function generateMetadata({
  title,
  description,
  keywords = [],
  image = '/images/og-image.jpg', // Default OG image
  path = '',
  type = 'website',
}: {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  path?: string;
  type?: 'website' | 'article';
}): Metadata {
  const baseUrl = 'https://barfindr.com'; // Replace with your actual domain
  const url = path ? `${baseUrl}/${path}` : baseUrl;
  
  return {
    title,
    description,
    keywords: [
      'Austin bars',
      'Austin nightlife',
      'bars in Austin',
      'Austin TX bars',
      ...keywords,
    ],
    authors: [{ name: 'BarFindr Team' }],
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: 'BarFindr - Austin Bar Directory',
      images: [
        {
          url: image.startsWith('http') ? image : `${baseUrl}${image}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_US',
      type,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image.startsWith('http') ? image : `${baseUrl}${image}`],
      creator: '@barfindr',
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

/**
 * Generate metadata for a bar category page
 */
export function generateCategoryMetadata(type: string, slug: string, title: string, description: string): Metadata {
  // Format the type and slug for keywords
  const formattedValue = slug.split('-').join(' ');
  const formattedAttribute = type === 'feature' 
    ? `with ${formattedValue}` 
    : type === 'neighborhood' 
      ? `in ${formattedValue}` 
      : `that are ${formattedValue}`;
  
  // Generate relevant keywords
  const keywords = [
    `Austin bars ${formattedAttribute}`,
    `${formattedValue} bars Austin`,
    `Austin ${formattedValue} bars`,
    `best ${formattedValue} bars in Austin`,
    `Austin TX ${formattedValue} bars`,
  ];
  
  return generateMetadata({
    title,
    description,
    keywords,
    path: `categories/${type}/${slug}`,
    type: 'article',
  });
}
