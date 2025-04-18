#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { execSync } = require('child_process');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const BARS_DIR = path.join(__dirname, '../src/data/bars');
const TEMPLATE_PATH = path.join(BARS_DIR, '_template.json');

/**
 * Converts a string to kebab-case for filenames
 */
function toKebabCase(str) {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-');
}

/**
 * Gets the highest existing bar ID
 */
function getHighestBarId() {
  const files = fs.readdirSync(BARS_DIR).filter(file => file.endsWith('.json') && !file.startsWith('_'));
  
  if (files.length === 0) {
    return 0;
  }
  
  const bars = files.map(file => {
    const content = fs.readFileSync(path.join(BARS_DIR, file), 'utf8');
    return JSON.parse(content);
  });
  
  return Math.max(...bars.map(bar => parseInt(bar.id)));
}

/**
 * Creates a new bar file
 */
function createNewBar() {
  console.log('\n=== Create New Bar ===\n');
  
  // Read the template
  const template = JSON.parse(fs.readFileSync(TEMPLATE_PATH, 'utf8'));
  
  // Generate a new ID
  template.id = (getHighestBarId() + 1).toString();
  
  // Prompt for bar details
  rl.question('Bar name: ', (name) => {
    template.name = name;
    
    rl.question('Address: ', (address) => {
      template.address = address;
      
      rl.question('Description: ', (description) => {
        template.description = description;
        
        rl.question('Rating (0.0-5.0): ', (rating) => {
          template.rating = parseFloat(rating);
          
          rl.question('Image URL: ', (imageUrl) => {
            template.imageUrl = imageUrl;
            
            rl.question('Has happy hour? (yes/no): ', (hasHappyHour) => {
              template.hasHappyHour = hasHappyHour.toLowerCase() === 'yes';
              
              if (template.hasHappyHour) {
                rl.question('Happy hour details: ', (happyHourDetails) => {
                  template.happyHourDetails = happyHourDetails;
                  promptForOpeningHours();
                });
              } else {
                delete template.happyHourDetails;
                promptForOpeningHours();
              }
            });
          });
        });
      });
    });
  });
  
  function promptForOpeningHours() {
    console.log('\nEnter opening hours for each day (e.g., "5pm-2am" or "Closed"):');
    
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    let currentDay = 0;
    
    function promptNextDay() {
      if (currentDay >= days.length) {
        promptForTags();
        return;
      }
      
      const day = days[currentDay];
      rl.question(`${day}: `, (hours) => {
        template.openingHours[day] = hours;
        currentDay++;
        promptNextDay();
      });
    }
    
    promptNextDay();
  }
  
  function promptForTags() {
    rl.question('\nTags (comma-separated): ', (tags) => {
      template.tags = tags.split(',').map(tag => tag.trim()).filter(tag => tag);
      
      console.log('\nEnter location coordinates:');
      rl.question('Latitude: ', (lat) => {
        template.location.lat = parseFloat(lat);
        
        rl.question('Longitude: ', (lng) => {
          template.location.lng = parseFloat(lng);
          
          // Save the file
          const filename = `${toKebabCase(template.name)}.json`;
          const filePath = path.join(BARS_DIR, filename);
          
          fs.writeFileSync(filePath, JSON.stringify(template, null, 2));
          console.log(`\nBar saved to ${filename}`);
          
          // Remind to update data.ts
          console.log('\nDon\'t forget to update src/lib/data.ts to include the new bar!');
          console.log(`Add these lines:\nimport ${toKebabCase(template.name).replace(/-/g, '')} from "../data/bars/${filename}";\n`);
          console.log(`And add ${toKebabCase(template.name).replace(/-/g, '')} to the bars array.\n`);
          
          rl.close();
        });
      });
    });
  }
}

/**
 * Validates all bar files
 */
function validateBars() {
  console.log('\n=== Validating Bar Data ===\n');
  
  const files = fs.readdirSync(BARS_DIR).filter(file => file.endsWith('.json') && !file.startsWith('_'));
  let hasErrors = false;
  
  files.forEach(file => {
    const filePath = path.join(BARS_DIR, file);
    const content = fs.readFileSync(filePath, 'utf8');
    
    try {
      const bar = JSON.parse(content);
      const errors = validateBar(bar);
      
      if (errors.length > 0) {
        console.log(`\n${file}:`);
        errors.forEach(error => console.log(`  - ${error}`));
        hasErrors = true;
      }
    } catch (e) {
      console.log(`\n${file}:`);
      console.log(`  - Invalid JSON: ${e.message}`);
      hasErrors = true;
    }
  });
  
  if (!hasErrors) {
    console.log('All bar data is valid!');
  }
  
  rl.close();
}

/**
 * Validates a bar object
 */
function validateBar(bar) {
  const errors = [];
  
  if (!bar.id) errors.push('ID is required');
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
  
  return errors;
}

/**
 * Lists all bars
 */
function listBars() {
  console.log('\n=== Bar List ===\n');
  
  const files = fs.readdirSync(BARS_DIR).filter(file => file.endsWith('.json') && !file.startsWith('_'));
  
  if (files.length === 0) {
    console.log('No bars found.');
    rl.close();
    return;
  }
  
  const bars = files.map(file => {
    const content = fs.readFileSync(path.join(BARS_DIR, file), 'utf8');
    const bar = JSON.parse(content);
    return {
      id: bar.id,
      name: bar.name,
      file
    };
  }).sort((a, b) => parseInt(a.id) - parseInt(b.id));
  
  bars.forEach(bar => {
    console.log(`${bar.id}: ${bar.name} (${bar.file})`);
  });
  
  rl.close();
}

/**
 * Main menu
 */
function showMenu() {
  console.log('\n=== BarFindr Data Management ===\n');
  console.log('1. Create new bar');
  console.log('2. Validate bar data');
  console.log('3. List all bars');
  console.log('4. Exit');
  
  rl.question('\nSelect an option: ', (answer) => {
    switch (answer) {
      case '1':
        createNewBar();
        break;
      case '2':
        validateBars();
        break;
      case '3':
        listBars();
        break;
      case '4':
        rl.close();
        break;
      default:
        console.log('Invalid option');
        showMenu();
        break;
    }
  });
}

// Make the script executable
try {
  execSync(`chmod +x ${__filename}`);
} catch (e) {
  // Ignore errors on Windows
}

// Start the script
showMenu();
