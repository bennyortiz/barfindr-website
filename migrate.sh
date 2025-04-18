#!/bin/bash

# Script to help migrate the codebase to the new structure

# Create directories
echo "Creating directories..."
mkdir -p src/core/components/layout
mkdir -p src/core/components/ui
mkdir -p src/core/hooks
mkdir -p src/core/utils
mkdir -p src/features/bars/components
mkdir -p src/features/bars/hooks
mkdir -p src/features/bars/utils
mkdir -p src/features/maps/components
mkdir -p src/features/maps/hooks
mkdir -p src/features/maps/utils
mkdir -p src/features/happy-hours/components
mkdir -p src/features/happy-hours/hooks
mkdir -p src/features/happy-hours/utils
mkdir -p src/types

echo "Directories created successfully!"
echo "Next steps:"
echo "1. Manually move files to their new locations"
echo "2. Update imports in your code to use the new structure"
echo "3. Test the application to ensure everything works"
