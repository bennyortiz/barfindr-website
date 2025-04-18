/**
 * Script to add slugs to all bar data files
 * 
 * This script:
 * 1. Reads all bar data files
 * 2. Generates a slug for each bar based on its name
 * 3. Ensures the slug is unique
 * 4. Updates the bar data file with the slug
 */

const fs = require('fs');
const path = require('path');

// Function to generate a slug from a name
function generateSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-')     // Replace spaces with hyphens
    .replace(/-+/g, '-')      // Replace multiple hyphens with a single one
    .trim();
}

// Function to ensure a slug is unique
function ensureUniqueSlug(slug, existingSlugs) {
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

// Main function
function addSlugsToBarData() {
  const barsDirectory = path.join(process.cwd(), 'src/data/bars');
  const fileNames = fs.readdirSync(barsDirectory);
  
  // Filter out non-JSON files and template files
  const barFiles = fileNames.filter(fileName => 
    fileName.endsWith('.json') && !fileName.startsWith('_') && fileName !== 'schema.json'
  );
  
  console.log(`Found ${barFiles.length} bar data files`);
  
  // First pass: collect all existing slugs
  const existingSlugs = [];
  const bars = [];
  
  barFiles.forEach(fileName => {
    const filePath = path.join(barsDirectory, fileName);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const bar = JSON.parse(fileContents);
    
    // Generate a slug for the bar
    const slug = generateSlug(bar.name);
    
    bars.push({ bar, filePath, slug });
  });
  
  // Second pass: ensure unique slugs and update files
  bars.forEach(({ bar, filePath, slug }) => {
    const uniqueSlug = ensureUniqueSlug(slug, existingSlugs);
    existingSlugs.push(uniqueSlug);
    
    // Add the slug to the bar data
    bar.slug = uniqueSlug;
    
    // Add optional fields if they don't exist
    if (!bar.type) bar.type = "";
    if (!bar.priceRange) bar.priceRange = 2; // Default to moderate
    if (!bar.neighborhood) bar.neighborhood = "";
    if (!bar.features) bar.features = [];
    if (!bar.zipCode) {
      // Try to extract ZIP code from address
      const zipMatch = bar.address.match(/\d{5}/);
      bar.zipCode = zipMatch ? zipMatch[0] : "";
    }
    
    // Write the updated bar data back to the file
    fs.writeFileSync(filePath, JSON.stringify(bar, null, 2));
    
    console.log(`Updated ${path.basename(filePath)} with slug: ${uniqueSlug}`);
  });
  
  console.log('All bar data files updated with slugs');
}

// Run the script
addSlugsToBarData();
