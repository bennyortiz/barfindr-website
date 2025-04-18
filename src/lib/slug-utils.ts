/**
 * Utility functions for generating and handling slugs
 */

/**
 * Generates a URL-friendly slug from a string
 * 
 * @param name - The string to convert to a slug
 * @returns A URL-friendly slug
 * 
 * @example
 * generateSlug("The Roosevelt Room") // "the-roosevelt-room"
 * generateSlug("Whisler's") // "whislers"
 */
export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-')     // Replace spaces with hyphens
    .replace(/-+/g, '-')      // Replace multiple hyphens with a single one
    .trim();
}

/**
 * Checks if a slug is valid
 * 
 * @param slug - The slug to validate
 * @returns True if the slug is valid, false otherwise
 */
export function isValidSlug(slug: string): boolean {
  // Slugs should only contain lowercase letters, numbers, and hyphens
  // They should not start or end with a hyphen
  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  return slugRegex.test(slug);
}

/**
 * Ensures a slug is unique among existing slugs
 * 
 * @param slug - The base slug
 * @param existingSlugs - Array of existing slugs to check against
 * @returns A unique slug, with a number appended if necessary
 * 
 * @example
 * ensureUniqueSlug("bar-name", ["bar-name"]) // "bar-name-2"
 */
export function ensureUniqueSlug(slug: string, existingSlugs: string[]): string {
  if (!existingSlugs.includes(slug)) {
    return slug;
  }
  
  let counter = 2;
  let uniqueSlug = `${slug}-${counter}`;
  
  while (existingSlugs.includes(uniqueSlug)) {
    counter++;
    uniqueSlug = `${slug}-${counter}`;
  }
  
  return uniqueSlug;
}
