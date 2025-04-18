/**
 * Bar Data Utilities
 *
 * Functions for working with bar data, including finding bars by ID or slug,
 * and generating URLs for bars.
 */

import { Bar } from "./types";
import { bars } from "./data";
import { generateSlug } from "./slug-utils";

/**
 * Get a bar by its ID
 *
 * @param id - The ID of the bar to find
 * @returns The bar with the matching ID, or undefined if not found
 */
export function getBarById(id: string): Bar | undefined {
  return bars.find(bar => bar.id === id);
}

/**
 * Get a bar by its slug
 *
 * @param slug - The slug of the bar to find
 * @returns The bar with the matching slug, or undefined if not found
 */
export function getBarBySlug(slug: string): Bar | undefined {
  return bars.find(bar => bar.slug === slug);
}

/**
 * Get a bar by either ID or slug
 * This is useful for backward compatibility during the transition
 *
 * @param idOrSlug - The ID or slug of the bar to find
 * @returns The bar with the matching ID or slug, or undefined if not found
 */
export function getBar(idOrSlug: string): Bar | undefined {
  // First try to find by ID (for backward compatibility)
  const barById = getBarById(idOrSlug);
  if (barById) {
    return barById;
  }

  // Then try to find by slug
  return getBarBySlug(idOrSlug);
}

/**
 * Generate a new unique ID for a bar
 *
 * @param name - The name of the bar
 * @returns A unique slug-based ID
 */
export function generateBarId(name: string): string {
  const baseSlug = generateSlug(name);

  // Check if the slug is already in use
  const existingSlugs = bars.map(bar => bar.slug);

  // If the slug is not in use, use it as is
  if (!existingSlugs.includes(baseSlug)) {
    return baseSlug;
  }

  // Otherwise, add a number suffix
  let counter = 2;
  let newSlug = `${baseSlug}-${counter}`;

  while (existingSlugs.includes(newSlug)) {
    counter++;
    newSlug = `${baseSlug}-${counter}`;
  }

  return newSlug;
}

/**
 * Generate a URL for a bar
 *
 * @param bar - The bar object or slug string
 * @param absolute - Whether to return an absolute URL (with domain)
 * @returns The URL for the bar
 */
export function getBarUrl(bar: Bar | string, absolute: boolean = false): string {
  // Get the slug from either a bar object or a string
  const slug = typeof bar === 'string' ? bar : bar.slug;

  // Generate the relative URL
  const relativeUrl = `/bars/${slug}`;

  // Return absolute URL if requested
  if (absolute) {
    const domain = process.env.NEXT_PUBLIC_SITE_URL || 'https://barfindr.com';
    return `${domain}${relativeUrl}`;
  }

  return relativeUrl;
}
