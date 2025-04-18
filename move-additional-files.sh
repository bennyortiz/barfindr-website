#!/bin/bash

# Script to move additional files to the new structure

echo "Moving additional files..."

# Move components at the root level
cp -v src/components/BarCard.tsx src/features/bars/components/ 2>/dev/null || echo "BarCard.tsx not found"
cp -v src/components/BarDetailTabs.tsx src/features/bars/components/ 2>/dev/null || echo "BarDetailTabs.tsx not found"
cp -v src/components/BarFilter.tsx src/features/bars/components/ 2>/dev/null || echo "BarFilter.tsx not found"
cp -v src/components/Footer.tsx src/core/components/layout/ 2>/dev/null || echo "Footer.tsx not found"
cp -v src/components/Navbar.tsx src/core/components/layout/ 2>/dev/null || echo "Navbar.tsx not found"

# Move additional layout components
cp -v src/components/layout/MainLayout.tsx src/core/components/layout/ 2>/dev/null || echo "MainLayout.tsx not found"

echo "Files moved successfully!"
