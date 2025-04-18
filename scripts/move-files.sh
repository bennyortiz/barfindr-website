#!/bin/bash

# Script to move files to their new locations according to the organization plan

# Core Components - Layout
echo "Moving layout components..."
cp -v src/components/layout/Footer.tsx src/core/components/layout/
cp -v src/components/layout/Navbar.tsx src/core/components/layout/
cp -v src/components/layout/page-layout.tsx src/core/components/layout/PageLayout.tsx
cp -v src/components/templates/DetailPage.tsx src/core/components/layout/
cp -v src/components/templates/StandardPage.tsx src/core/components/layout/

# Core Components - UI
echo "Moving UI components..."
cp -v src/components/ui/*.tsx src/core/components/ui/

# Feature Components - Bars
echo "Moving bar components..."
cp -v src/components/bars/BarCard.tsx src/features/bars/components/
cp -v src/components/bars/BarDetailTabs.tsx src/features/bars/components/
cp -v src/components/bars/BarFilter.tsx src/features/bars/components/
cp -v src/components/bars/EnhancedBarCard.tsx src/features/bars/components/

# Feature Components - Maps
echo "Moving map components..."
cp -v src/components/map/Map.tsx src/features/maps/components/
cp -v src/components/map/MapClient.tsx src/features/maps/components/
cp -v src/components/map/MapInternal.tsx src/features/maps/components/
cp -v src/components/map/SimpleMap.tsx src/features/maps/components/

# Hooks
echo "Moving hooks..."
cp -v src/hooks/useBarData.ts src/features/bars/hooks/

# Utils
echo "Moving utils..."
cp -v src/utils/bar-utils.ts src/features/bars/utils/
cp -v src/utils/animation-utils.ts src/core/utils/
cp -v src/utils/date-utils.ts src/core/utils/

echo "Files moved successfully!"
