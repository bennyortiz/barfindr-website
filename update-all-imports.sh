#!/bin/bash

# Script to update all imports in the codebase

echo "Updating imports..."

# Update imports from @/components/ui to @/core/components/ui
find src -type f -name "*.tsx" -o -name "*.ts" | xargs sed -i '' 's|@/components/ui|@/core/components/ui|g'

# Update imports from @/components/layout to @/core/components/layout
find src -type f -name "*.tsx" -o -name "*.ts" | xargs sed -i '' 's|@/components/layout|@/core/components/layout|g'

# Update imports from @/components/bars to @/features/bars/components
find src -type f -name "*.tsx" -o -name "*.ts" | xargs sed -i '' 's|@/components/bars|@/features/bars/components|g'

# Update imports from @/components/map to @/features/maps/components
find src -type f -name "*.tsx" -o -name "*.ts" | xargs sed -i '' 's|@/components/map|@/features/maps/components|g'

# Update imports from @/hooks/useBarData to @/features/bars/hooks/useBarData
find src -type f -name "*.tsx" -o -name "*.ts" | xargs sed -i '' 's|@/hooks/useBarData|@/features/bars/hooks/useBarData|g'

# Update imports from @/utils/bar-utils to @/features/bars/utils/bar-utils
find src -type f -name "*.tsx" -o -name "*.ts" | xargs sed -i '' 's|@/utils/bar-utils|@/features/bars/utils/bar-utils|g'

# Update imports from @/utils/animation-utils to @/core/utils/animation-utils
find src -type f -name "*.tsx" -o -name "*.ts" | xargs sed -i '' 's|@/utils/animation-utils|@/core/utils/animation-utils|g'

# Update imports from @/utils/date-utils to @/core/utils/date-utils
find src -type f -name "*.tsx" -o -name "*.ts" | xargs sed -i '' 's|@/utils/date-utils|@/core/utils/date-utils|g'

# Update imports from @/components/templates to @/core/components/layout
find src -type f -name "*.tsx" -o -name "*.ts" | xargs sed -i '' 's|@/components/templates|@/core/components/layout|g'

echo "Imports updated successfully!"
echo "Next steps:"
echo "1. Test the application to ensure everything works"
echo "2. Remove the old directories once you're confident everything works"
