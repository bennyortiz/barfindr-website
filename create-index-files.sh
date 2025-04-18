#!/bin/bash

# Script to create index files for exports

# Core Components - Layout
echo "Creating index file for layout components..."
cat > src/core/components/layout/index.ts << EOL
// Core layout components
export { default as Footer } from './Footer';
export { default as Navbar } from './Navbar';
export { default as PageLayout } from './PageLayout';
export { default as DetailPage } from './DetailPage';
export { default as StandardPage } from './StandardPage';
EOL

# Feature Components - Bars
echo "Creating index file for bar components..."
cat > src/features/bars/components/index.ts << EOL
// Bar components
export { default as BarCard } from './BarCard';
export { default as BarDetailTabs } from './BarDetailTabs';
export { default as BarFilter } from './BarFilter';
export { default as EnhancedBarCard } from './EnhancedBarCard';
EOL

# Feature Components - Maps
echo "Creating index file for map components..."
cat > src/features/maps/components/index.ts << EOL
// Map components
export { default as Map } from './Map';
export { default as MapClient } from './MapClient';
export { default as MapInternal } from './MapInternal';
export { default as SimpleMap } from './SimpleMap';
EOL

# Hooks
echo "Creating index file for bar hooks..."
cat > src/features/bars/hooks/index.ts << EOL
// Bar hooks
export { default as useBarData } from './useBarData';
EOL

# Utils
echo "Creating index file for bar utilities..."
cat > src/features/bars/utils/index.ts << EOL
// Bar utilities
export * from './bar-utils';
EOL

echo "Creating index file for core utilities..."
cat > src/core/utils/index.ts << EOL
// Core utilities
export * from './animation-utils';
export * from './date-utils';
EOL

# UI Components
echo "Creating index file for UI components..."
cat > src/core/components/ui/index.ts << EOL
// UI components
export { default as Avatar } from './avatar';
export { default as Badge } from './badge';
export { default as Button } from './button';
export { default as Card } from './card';
export { default as Container } from './container';
export { default as Dialog } from './dialog';
export { default as EnhancedButton } from './enhanced-button';
export { default as EnhancedInput } from './enhanced-input';
export { default as EnhancedSearch } from './enhanced-search';
export { default as Form } from './form';
export { default as Hero } from './hero';
export { default as HoverCard } from './hover-card';
export { default as Input } from './input';
export { default as Label } from './label';
export { default as Map } from './map';
export { default as MapClient } from './map-client';
export { default as MapInternal } from './map-internal';
export { default as Select } from './select';
export { default as Sheet } from './sheet';
export { default as SimpleMap } from './simple-map';
export { default as Sonner } from './sonner';
export { default as Tabs } from './tabs';
export { default as TabsWithCard } from './tabs-with-card';
export { default as Textarea } from './textarea';
EOL

echo "Index files created successfully!"
echo "Next steps:"
echo "1. Update imports in your code to use the new structure"
echo "2. Test the application to ensure everything works"
