import { MetadataRoute } from 'next';

/**
 * Sitemap index file
 * 
 * This file helps search engines discover all the sitemaps on the site.
 * It's particularly useful as the site grows with more dynamic pages.
 */
export default function sitemapIndex(): MetadataRoute.SitemapIndex {
  const baseUrl = 'https://barfindr.com'; // Replace with your actual domain
  
  return [
    {
      url: `${baseUrl}/sitemap.xml`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/sitemap-categories.xml`,
      lastModified: new Date(),
    },
  ];
}
