import { MetadataRoute } from 'next';

/**
 * Categories sitemap
 * 
 * This sitemap specifically lists all category pages to ensure
 * search engines discover and index them properly.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://barfindr.com'; // Replace with your actual domain
  
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
    { attribute: 'neighborhood', value: 'west-austin' },
    { attribute: 'neighborhood', value: 'north-austin' },
    { attribute: 'neighborhood', value: 'south-austin' },
    { attribute: 'neighborhood', value: 'sixth-street' },
    
    // Price ranges
    { attribute: 'price', value: 'cheap' },
    { attribute: 'price', value: 'moderate' },
    { attribute: 'price', value: 'upscale' },
    
    // Bar types
    { attribute: 'type', value: 'dive-bar' },
    { attribute: 'type', value: 'wine-bar' },
    { attribute: 'type', value: 'pub' },
    { attribute: 'type', value: 'lounge' },
    { attribute: 'type', value: 'brewery' },
    { attribute: 'type', value: 'speakeasy' },
    { attribute: 'type', value: 'tiki-bar' },
    
    // Occasions
    { attribute: 'occasion', value: 'date-night' },
    { attribute: 'occasion', value: 'group-outings' },
    { attribute: 'occasion', value: 'happy-hour' },
    { attribute: 'occasion', value: 'birthday' },
    { attribute: 'occasion', value: 'after-work' },
    { attribute: 'occasion', value: 'weekend-brunch' },
    
    // Additional features
    { attribute: 'feature', value: 'games' },
    { attribute: 'feature', value: 'pool-table' },
    { attribute: 'feature', value: 'darts' },
    { attribute: 'feature', value: 'karaoke' },
    { attribute: 'feature', value: 'trivia-night' },
    { attribute: 'feature', value: 'outdoor-seating' },
    { attribute: 'feature', value: 'food-menu' },
    { attribute: 'feature', value: 'vegan-options' },
    { attribute: 'feature', value: 'gluten-free' },
    { attribute: 'feature', value: 'parking' },
    { attribute: 'feature', value: 'wheelchair-accessible' },
  ];
  
  // Generate sitemap entries for all attribute pages
  const attributePageUrls = attributePages.map(page => ({
    url: `${baseUrl}/bars/${page.attribute}/${page.value}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));
  
  // Add the main categories page
  const categoriesPage = {
    url: `${baseUrl}/categories`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.9,
  };
  
  return [categoriesPage, ...attributePageUrls];
}
