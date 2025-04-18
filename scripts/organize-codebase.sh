#!/bin/bash

# Script to organize the BarFindr codebase
# This script will:
# 1. Move components to their appropriate directories
# 2. Create index files for exports
# 3. Standardize naming conventions

# Create necessary directories
mkdir -p src/features/bars/components
mkdir -p src/features/bars/hooks
mkdir -p src/features/bars/utils

mkdir -p src/features/maps/components
mkdir -p src/features/maps/hooks
mkdir -p src/features/maps/utils

mkdir -p src/features/happy-hours/components
mkdir -p src/features/happy-hours/hooks
mkdir -p src/features/happy-hours/utils

mkdir -p src/features/categories/components

mkdir -p src/core/components/layout
mkdir -p src/core/components/ui
mkdir -p src/core/hooks
mkdir -p src/core/utils

# Move bar-related components
echo "Moving bar-related components..."
cp -f src/components/bars/BarCard.tsx src/features/bars/components/
cp -f src/components/bars/BarDetailTabs.tsx src/features/bars/components/
cp -f src/components/bars/BarFilter.tsx src/features/bars/components/
cp -f src/components/bars/EnhancedBarCard.tsx src/features/bars/components/

# Move map-related components
echo "Moving map-related components..."
cp -f src/components/map/Map.tsx src/features/maps/components/
cp -f src/components/map/MapClient.tsx src/features/maps/components/
cp -f src/components/map/MapInternal.tsx src/features/maps/components/
cp -f src/components/map/SimpleMap.tsx src/features/maps/components/

# Move layout components
echo "Moving layout components..."
cp -f src/components/layout/Footer.tsx src/core/components/layout/
cp -f src/components/layout/Navbar.tsx src/core/components/layout/
cp -f src/components/layout/page-layout.tsx src/core/components/layout/PageLayout.tsx
cp -f src/components/templates/DetailPage.tsx src/core/components/layout/
cp -f src/components/templates/StandardPage.tsx src/core/components/layout/

# Move UI components
echo "Moving UI components..."
cp -f src/components/ui/*.tsx src/core/components/ui/

# Move hooks
echo "Moving hooks..."
cp -f src/hooks/useBarData.ts src/features/bars/hooks/

# Move utils
echo "Moving utils..."
cp -f src/utils/bar-utils.ts src/features/bars/utils/
cp -f src/utils/animation-utils.ts src/core/utils/
cp -f src/utils/date-utils.ts src/core/utils/

# Create index files
echo "Creating index files..."

# Bars index
cat > src/features/bars/components/index.ts << EOL
export { default as BarCard } from './BarCard';
export { default as BarDetailTabs } from './BarDetailTabs';
export { default as BarFilter } from './BarFilter';
export { default as EnhancedBarCard } from './EnhancedBarCard';
EOL

# Maps index
cat > src/features/maps/components/index.ts << EOL
export { default as Map } from './Map';
export { default as MapClient } from './MapClient';
export { default as MapInternal } from './MapInternal';
export { default as SimpleMap } from './SimpleMap';
EOL

# Layout index
cat > src/core/components/layout/index.ts << EOL
export { default as Footer } from './Footer';
export { default as Navbar } from './Navbar';
export { default as PageLayout } from './PageLayout';
export { default as DetailPage } from './DetailPage';
export { default as StandardPage } from './StandardPage';
EOL

# UI index
cat > src/core/components/ui/index.ts << EOL
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
export { default as Select } from './select';
export { default as Sheet } from './sheet';
export { default as Sonner } from './sonner';
export { default as Tabs } from './tabs';
export { default as TabsWithCard } from './tabs-with-card';
export { default as Textarea } from './textarea';
EOL

# Hooks index
cat > src/features/bars/hooks/index.ts << EOL
export { default as useBarData } from './useBarData';
EOL

# Utils index
cat > src/features/bars/utils/index.ts << EOL
export * from './bar-utils';
EOL

cat > src/core/utils/index.ts << EOL
export * from './animation-utils';
export * from './date-utils';
EOL

echo "Organization complete!"
