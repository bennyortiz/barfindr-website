import { MetadataRoute } from 'next';
import { bars } from '@/lib/data';

// Define all the attribute combinations we want to generate pages for
const attributePages = [
  // Features
  { attribute: 'feature', value: 'patio' },
  { attribute: 'feature', value: 'rooftop' },
  { attribute: 'feature', value: 'live-music' },
  { attribute: 'feature', value: 'dog-friendly' },
  { attribute: 'feature', value: 'craft-beer' },
  { attribute: 'feature', value: 'sports-bar' },
  { attribute: 'feature', value: 'cocktail-bar' },
  
  // Neighborhoods
  { attribute: 'neighborhood', value: 'downtown' },
  { attribute: 'neighborhood', value: 'east-austin' },
  { attribute: 'neighborhood', value: 'south-congress' },
  { attribute: 'neighborhood', value: 'rainey-street' },
  
  // Price ranges
  { attribute: 'price', value: 'cheap' },
  { attribute: 'price', value: 'moderate' },
  { attribute: 'price', value: 'upscale' },
  
  // Bar types
  { attribute: 'type', value: 'dive-bar' },
  { attribute: 'type', value: 'wine-bar' },
  { attribute: 'type', value: 'pub' },
  { attribute: 'type', value: 'lounge' },
  
  // Occasions
  { attribute: 'occasion', value: 'date-night' },
  { attribute: 'occasion', value: 'group-outings' },
  { attribute: 'occasion', value: 'happy-hour' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://barfindr.com'; // Replace with your actual domain
  
  // Core pages
  const corePages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/bars`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/happy-hours`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/enhanced`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];
  
  // Individual bar pages
  const barPages = bars.map(bar => ({
    url: `${baseUrl}/bars/${bar.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));
  
  // Attribute pages
  const attributePageUrls = attributePages.map(page => ({
    url: `${baseUrl}/bars/${page.attribute}/${page.value}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));
  
  return [...corePages, ...barPages, ...attributePageUrls];
}
