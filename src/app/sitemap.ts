import { MetadataRoute } from 'next';
import { bars } from '@/lib/data';

// Define all the category combinations we want to generate pages for
const categoryPages = [
  // Features
  { type: 'feature', slug: 'patio' },
  { type: 'feature', slug: 'rooftop' },
  { type: 'feature', slug: 'live-music' },
  { type: 'feature', slug: 'dog-friendly' },
  { type: 'feature', slug: 'craft-beer' },
  { type: 'feature', slug: 'sports-bar' },
  { type: 'feature', slug: 'cocktail-bar' },

  // Neighborhoods
  { type: 'neighborhood', slug: 'downtown' },
  { type: 'neighborhood', slug: 'east-austin' },
  { type: 'neighborhood', slug: 'south-congress' },
  { type: 'neighborhood', slug: 'rainey-street' },

  // Price ranges
  { type: 'price', slug: 'cheap' },
  { type: 'price', slug: 'moderate' },
  { type: 'price', slug: 'upscale' },

  // Bar types
  { type: 'type', slug: 'dive-bar' },
  { type: 'type', slug: 'wine-bar' },
  { type: 'type', slug: 'pub' },
  { type: 'type', slug: 'lounge' },

  // Occasions
  { type: 'occasion', slug: 'date-night' },
  { type: 'occasion', slug: 'group-outings' },
  { type: 'occasion', slug: 'happy-hour' },
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
    url: `${baseUrl}/bars/${bar.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  // Category pages
  const categoryPageUrls = categoryPages.map(page => ({
    url: `${baseUrl}/categories/${page.type}/${page.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // Add the categories index page
  const categoriesPage = {
    url: `${baseUrl}/categories`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.9,
  };

  return [...corePages, ...barPages, ...categoryPageUrls, categoriesPage];
}
