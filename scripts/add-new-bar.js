/**
 * Script to add a new bar to the BarFindr database
 * 
 * This script:
 * 1. Takes bar information from command line arguments
 * 2. Generates a slug from the bar name
 * 3. Creates a new JSON file with the bar data
 * 4. Updates the data.ts file to import and export the new bar
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

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

// Function to get the highest existing ID
function getHighestId(bars) {
  return bars.reduce((maxId, bar) => {
    const id = parseInt(bar.id);
    return isNaN(id) ? maxId : Math.max(maxId, id);
  }, 0);
}

// Create a readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Function to prompt for input
function prompt(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

// Main function
async function addNewBar() {
  try {
    console.log('=== Add New Bar to BarFindr ===');
    
    // Get bar information from user
    const name = await prompt('Bar name: ');
    const address = await prompt('Address: ');
    const description = await prompt('Description: ');
    const rating = parseFloat(await prompt('Rating (0.0-5.0): '));
    const imageUrl = await prompt('Image URL: ');
    const hasHappyHour = (await prompt('Has happy hour? (y/n): ')).toLowerCase() === 'y';
    let happyHourDetails = '';
    if (hasHappyHour) {
      happyHourDetails = await prompt('Happy hour details: ');
    }
    const tags = (await prompt('Tags (comma-separated): ')).split(',').map(tag => tag.trim());
    const lat = parseFloat(await prompt('Latitude: '));
    const lng = parseFloat(await prompt('Longitude: '));
    const type = await prompt('Type (e.g., dive bar, wine bar): ');
    const priceRange = parseInt(await prompt('Price range (1-4): '));
    const neighborhood = await prompt('Neighborhood: ');
    const features = (await prompt('Features (comma-separated): ')).split(',').map(feature => feature.trim());
    const zipCode = await prompt('ZIP code: ');
    
    // Read existing bars to get the highest ID and check for slug conflicts
    const barsDirectory = path.join(process.cwd(), 'src/data/bars');
    const fileNames = fs.readdirSync(barsDirectory);
    
    // Filter out non-JSON files and template files
    const barFiles = fileNames.filter(fileName => 
      fileName.endsWith('.json') && !fileName.startsWith('_') && fileName !== 'schema.json'
    );
    
    // Read all bar data
    const bars = [];
    barFiles.forEach(fileName => {
      const filePath = path.join(barsDirectory, fileName);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const bar = JSON.parse(fileContents);
      bars.push(bar);
    });
    
    // Generate a new ID
    const newId = (getHighestId(bars) + 1).toString();
    
    // Generate a slug from the name
    const baseSlug = generateSlug(name);
    const existingSlugs = bars.map(bar => bar.slug || '');
    const slug = ensureUniqueSlug(baseSlug, existingSlugs);
    
    // Create the new bar object
    const newBar = {
      id: newId,
      name,
      slug,
      address,
      description,
      rating,
      imageUrl,
      hasHappyHour,
      happyHourDetails: hasHappyHour ? happyHourDetails : '',
      openingHours: {
        Monday: await prompt('Opening hours for Monday: '),
        Tuesday: await prompt('Opening hours for Tuesday: '),
        Wednesday: await prompt('Opening hours for Wednesday: '),
        Thursday: await prompt('Opening hours for Thursday: '),
        Friday: await prompt('Opening hours for Friday: '),
        Saturday: await prompt('Opening hours for Saturday: '),
        Sunday: await prompt('Opening hours for Sunday: ')
      },
      tags,
      location: {
        lat,
        lng
      },
      type,
      priceRange,
      neighborhood,
      features,
      zipCode
    };
    
    // Create the file name from the slug
    const fileName = `${slug}.json`;
    const filePath = path.join(barsDirectory, fileName);
    
    // Write the new bar data to a file
    fs.writeFileSync(filePath, JSON.stringify(newBar, null, 2));
    
    console.log(`\nBar "${name}" added successfully!`);
    console.log(`File created: ${fileName}`);
    
    // Update the data.ts file to import and export the new bar
    const dataFilePath = path.join(process.cwd(), 'src/lib/data.ts');
    let dataFileContent = fs.readFileSync(dataFilePath, 'utf8');
    
    // Add the import statement
    const importStatement = `import ${slug.replace(/-/g, '')} from "../data/bars/${slug}.json";\n`;
    const importInsertionPoint = dataFileContent.lastIndexOf('import ') + 'import '.length;
    const importEndPoint = dataFileContent.indexOf('\n\n// Export the bars array');
    const allImports = dataFileContent.substring(importInsertionPoint, importEndPoint);
    
    dataFileContent = dataFileContent.replace(
      allImports,
      allImports + importStatement
    );
    
    // Add the bar to the bars array
    const barArrayStart = dataFileContent.indexOf('export const bars: Bar[] = [') + 'export const bars: Bar[] = ['.length;
    const barArrayEnd = dataFileContent.indexOf('] as Bar[];');
    const barArray = dataFileContent.substring(barArrayStart, barArrayEnd);
    
    dataFileContent = dataFileContent.replace(
      barArray,
      barArray + `\n  ${slug.replace(/-/g, '')},`
    );
    
    // Write the updated data.ts file
    fs.writeFileSync(dataFilePath, dataFileContent);
    
    console.log('data.ts file updated successfully!');
    console.log('\nDon\'t forget to:');
    console.log('1. Check the new bar data for accuracy');
    console.log('2. Optimize and compress the image if needed');
    console.log('3. Run the build to make sure everything works');
    
  } catch (error) {
    console.error('Error adding new bar:', error);
  } finally {
    rl.close();
  }
}

// Run the script
addNewBar();
