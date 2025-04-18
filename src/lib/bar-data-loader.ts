import { Bar } from './types';
import fs from 'fs';
import path from 'path';

/**
 * Loads all bar data from individual JSON files in the data/bars directory
 * @returns An array of Bar objects
 */
export function loadBars(): Bar[] {
  const barsDirectory = path.join(process.cwd(), 'src/data/bars');
  const fileNames = fs.readdirSync(barsDirectory);
  
  const bars: Bar[] = fileNames
    .filter(fileName => 
      // Only include .json files and exclude the template
      fileName.endsWith('.json') && !fileName.startsWith('_')
    )
    .map(fileName => {
      // Read the JSON file
      const filePath = path.join(barsDirectory, fileName);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      
      // Parse the JSON content
      const bar = JSON.parse(fileContents) as Bar;
      
      return bar;
    })
    // Sort by ID to maintain consistent order
    .sort((a, b) => {
      return parseInt(a.id) - parseInt(b.id);
    });
  
  return bars;
}

/**
 * Validates a bar object to ensure it has all required fields
 * @param bar The bar object to validate
 * @returns An object with validation result and any error messages
 */
export function validateBar(bar: Partial<Bar>): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  // Check required fields
  if (!bar.name) errors.push('Name is required');
  if (!bar.address) errors.push('Address is required');
  if (!bar.description) errors.push('Description is required');
  if (bar.rating === undefined || bar.rating < 0 || bar.rating > 5) errors.push('Rating must be between 0 and 5');
  if (!bar.imageUrl) errors.push('Image URL is required');
  if (bar.hasHappyHour === undefined) errors.push('Happy hour flag is required');
  if (bar.hasHappyHour && !bar.happyHourDetails) errors.push('Happy hour details are required when hasHappyHour is true');
  if (!bar.openingHours) errors.push('Opening hours are required');
  if (!bar.tags || !Array.isArray(bar.tags) || bar.tags.length === 0) errors.push('At least one tag is required');
  if (!bar.location) errors.push('Location is required');
  if (bar.location && (bar.location.lat === undefined || bar.location.lng === undefined)) {
    errors.push('Location must include latitude and longitude');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Generates a new unique ID for a bar
 * @returns A string ID that is one higher than the highest existing ID
 */
export function generateNewBarId(): string {
  const bars = loadBars();
  
  if (bars.length === 0) {
    return '1';
  }
  
  const highestId = Math.max(...bars.map(bar => parseInt(bar.id)));
  return (highestId + 1).toString();
}
