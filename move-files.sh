#!/bin/bash

# Script to move files to their new locations according to the organization plan

# Core Components - Layout
echo "Moving layout components..."
cp -v src/components/layout/Footer.tsx src/core/components/layout/ 2>/dev/null || echo "Footer.tsx not found"
cp -v src/components/layout/Navbar.tsx src/core/components/layout/ 2>/dev/null || echo "Navbar.tsx not found"
cp -v src/components/layout/page-layout.tsx src/core/components/layout/PageLayout.tsx 2>/dev/null || echo "page-layout.tsx not found"
cp -v src/components/templates/DetailPage.tsx src/core/components/layout/ 2>/dev/null || echo "DetailPage.tsx not found"
cp -v src/components/templates/StandardPage.tsx src/core/components/layout/ 2>/dev/null || echo "StandardPage.tsx not found"

# Core Components - UI
echo "Moving UI components..."
cp -v src/components/ui/*.tsx src/core/components/ui/ 2>/dev/null || echo "No UI components found"

# Feature Components - Bars
echo "Moving bar components..."
cp -v src/components/bars/BarCard.tsx src/features/bars/components/ 2>/dev/null || echo "BarCard.tsx not found"
cp -v src/components/bars/BarDetailTabs.tsx src/features/bars/components/ 2>/dev/null || echo "BarDetailTabs.tsx not found"
cp -v src/components/bars/BarFilter.tsx src/features/bars/components/ 2>/dev/null || echo "BarFilter.tsx not found"
cp -v src/components/bars/EnhancedBarCard.tsx src/features/bars/components/ 2>/dev/null || echo "EnhancedBarCard.tsx not found"

# Feature Components - Maps
echo "Moving map components..."
cp -v src/components/map/Map.tsx src/features/maps/components/ 2>/dev/null || echo "Map.tsx not found"
cp -v src/components/map/MapClient.tsx src/features/maps/components/ 2>/dev/null || echo "MapClient.tsx not found"
cp -v src/components/map/MapInternal.tsx src/features/maps/components/ 2>/dev/null || echo "MapInternal.tsx not found"
cp -v src/components/map/SimpleMap.tsx src/features/maps/components/ 2>/dev/null || echo "SimpleMap.tsx not found"

# Hooks
echo "Moving hooks..."
cp -v src/hooks/useBarData.ts src/features/bars/hooks/ 2>/dev/null || echo "useBarData.ts not found"

# Utils
echo "Moving utils..."
cp -v src/utils/bar-utils.ts src/features/bars/utils/ 2>/dev/null || echo "bar-utils.ts not found"
cp -v src/utils/animation-utils.ts src/core/utils/ 2>/dev/null || echo "animation-utils.ts not found"
cp -v src/utils/date-utils.ts src/core/utils/ 2>/dev/null || echo "date-utils.ts not found"

echo "Files moved successfully!"
echo "Next steps:"
echo "1. Create index files for exports"
echo "2. Update imports in your code to use the new structure"
echo "3. Test the application to ensure everything works"
