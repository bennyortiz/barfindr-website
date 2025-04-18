/**
 * Script to help migrate the codebase to the new structure
 * 
 * This script will:
 * 1. Create the new directory structure
 * 2. Copy files to their new locations
 * 3. Create index files for exports
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Create directories
const directories = [
  'src/core/components/layout',
  'src/core/components/ui',
  'src/core/hooks',
  'src/core/utils',
  'src/features/bars/components',
  'src/features/bars/hooks',
  'src/features/bars/utils',
  'src/features/maps/components',
  'src/features/maps/hooks',
  'src/features/maps/utils',
  'src/features/happy-hours/components',
  'src/features/happy-hours/hooks',
  'src/features/happy-hours/utils',
  'src/types'
];

// Create directories
directories.forEach(dir => {
  const fullPath = path.join(__dirname, '..', dir);
  if (!fs.existsSync(fullPath)) {
    console.log(`Creating directory: ${dir}`);
    fs.mkdirSync(fullPath, { recursive: true });
  }
});

// File mappings
const fileMappings = [
  // Layout components
  { src: 'src/components/layout/Footer.tsx', dest: 'src/core/components/layout/Footer.tsx' },
  { src: 'src/components/layout/Navbar.tsx', dest: 'src/core/components/layout/Navbar.tsx' },
  { src: 'src/components/layout/page-layout.tsx', dest: 'src/core/components/layout/PageLayout.tsx' },
  { src: 'src/components/templates/DetailPage.tsx', dest: 'src/core/components/layout/DetailPage.tsx' },
  { src: 'src/components/templates/StandardPage.tsx', dest: 'src/core/components/layout/StandardPage.tsx' },
  
  // Bar components
  { src: 'src/components/bars/BarCard.tsx', dest: 'src/features/bars/components/BarCard.tsx' },
  { src: 'src/components/bars/BarDetailTabs.tsx', dest: 'src/features/bars/components/BarDetailTabs.tsx' },
  { src: 'src/components/bars/BarFilter.tsx', dest: 'src/features/bars/components/BarFilter.tsx' },
  { src: 'src/components/bars/EnhancedBarCard.tsx', dest: 'src/features/bars/components/EnhancedBarCard.tsx' },
  
  // Map components
  { src: 'src/components/map/Map.tsx', dest: 'src/features/maps/components/Map.tsx' },
  { src: 'src/components/map/MapClient.tsx', dest: 'src/features/maps/components/MapClient.tsx' },
  { src: 'src/components/map/MapInternal.tsx', dest: 'src/features/maps/components/MapInternal.tsx' },
  { src: 'src/components/map/SimpleMap.tsx', dest: 'src/features/maps/components/SimpleMap.tsx' },
  
  // Hooks
  { src: 'src/hooks/useBarData.ts', dest: 'src/features/bars/hooks/useBarData.ts' },
  
  // Utils
  { src: 'src/utils/bar-utils.ts', dest: 'src/features/bars/utils/bar-utils.ts' },
  { src: 'src/utils/animation-utils.ts', dest: 'src/core/utils/animation-utils.ts' },
  { src: 'src/utils/date-utils.ts', dest: 'src/core/utils/date-utils.ts' },
];

// UI components
const uiComponents = fs.readdirSync(path.join(__dirname, '..', 'src/components/ui'))
  .filter(file => file.endsWith('.tsx') || file.endsWith('.ts'));

uiComponents.forEach(file => {
  fileMappings.push({
    src: `src/components/ui/${file}`,
    dest: `src/core/components/ui/${file}`
  });
});

// Copy files
fileMappings.forEach(mapping => {
  const srcPath = path.join(__dirname, '..', mapping.src);
  const destPath = path.join(__dirname, '..', mapping.dest);
  
  if (fs.existsSync(srcPath)) {
    console.log(`Copying ${mapping.src} to ${mapping.dest}`);
    
    // Create the destination directory if it doesn't exist
    const destDir = path.dirname(destPath);
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }
    
    // Copy the file
    fs.copyFileSync(srcPath, destPath);
  } else {
    console.log(`Source file not found: ${mapping.src}`);
  }
});

// Create index files
const indexFiles = [
  {
    path: 'src/core/components/layout/index.ts',
    content: `// Core layout components
export { default as Footer } from './Footer';
export { default as Navbar } from './Navbar';
export { default as PageLayout } from './PageLayout';
export { default as DetailPage } from './DetailPage';
export { default as StandardPage } from './StandardPage';
`
  },
  {
    path: 'src/features/bars/components/index.ts',
    content: `// Bar components
export { default as BarCard } from './BarCard';
export { default as BarDetailTabs } from './BarDetailTabs';
export { default as BarFilter } from './BarFilter';
export { default as EnhancedBarCard } from './EnhancedBarCard';
`
  },
  {
    path: 'src/features/maps/components/index.ts',
    content: `// Map components
export { default as Map } from './Map';
export { default as MapClient } from './MapClient';
export { default as MapInternal } from './MapInternal';
export { default as SimpleMap } from './SimpleMap';
`
  },
  {
    path: 'src/features/bars/hooks/index.ts',
    content: `// Bar hooks
export { default as useBarData } from './useBarData';
`
  },
  {
    path: 'src/features/bars/utils/index.ts',
    content: `// Bar utilities
export * from './bar-utils';
`
  },
  {
    path: 'src/core/utils/index.ts',
    content: `// Core utilities
export * from './animation-utils';
export * from './date-utils';
`
  }
];

// Create UI components index file
let uiIndexContent = '// UI components\n';
uiComponents.forEach(file => {
  const componentName = file.replace(/\.(tsx|ts)$/, '');
  const exportName = componentName.charAt(0).toUpperCase() + componentName.slice(1);
  uiIndexContent += `export { default as ${exportName} } from './${componentName}';\n`;
});

indexFiles.push({
  path: 'src/core/components/ui/index.ts',
  content: uiIndexContent
});

// Write index files
indexFiles.forEach(file => {
  const filePath = path.join(__dirname, '..', file.path);
  console.log(`Creating index file: ${file.path}`);
  fs.writeFileSync(filePath, file.content);
});

console.log('Migration setup complete!');
console.log('Next steps:');
console.log('1. Update imports in your code to use the new structure');
console.log('2. Test the application to ensure everything works');
console.log('3. Once confirmed, remove the old files');
