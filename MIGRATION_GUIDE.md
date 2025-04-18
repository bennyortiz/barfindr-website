# BarFindr Codebase Migration Guide

This guide explains how to migrate code from the old structure to the new organization.

## Import Path Changes

### Old Structure vs. New Structure

| Old Import | New Import |
|------------|------------|
| `@/components/ui/button` | `@/core/components/ui/button` |
| `@/components/layout/Navbar` | `@/core/components/layout/Navbar` |
| `@/components/bars/BarCard` | `@/features/bars/components/BarCard` |
| `@/components/map/SimpleMap` | `@/features/maps/components/SimpleMap` |
| `@/hooks/useBarData` | `@/features/bars/hooks/useBarData` |
| `@/utils/bar-utils` | `@/features/bars/utils/bar-utils` |
| `@/utils/animation-utils` | `@/core/utils/animation-utils` |

## Migration Steps

### 1. Move Files

Files should be moved to their new locations according to the organization plan. Here's a summary of where files should go:

- **UI Components**: `src/components/ui/*` → `src/core/components/ui/*`
- **Layout Components**: `src/components/layout/*` → `src/core/components/layout/*`
- **Bar Components**: `src/components/bars/*` → `src/features/bars/components/*`
- **Map Components**: `src/components/map/*` → `src/features/maps/components/*`
- **Hooks**: `src/hooks/*` → `src/features/*/hooks/*` or `src/core/hooks/*`
- **Utils**: `src/utils/*` → `src/features/*/utils/*` or `src/core/utils/*`

### 2. Update Imports

After moving files, update all imports to use the new paths. For example:

```typescript
// Old import
import { Button } from "@/components/ui/button";
import { BarCard } from "@/components/bars/BarCard";

// New import
import { Button } from "@/core/components/ui/button";
import { BarCard } from "@/features/bars/components/BarCard";
```

### 3. Use Index Files

For better organization, use index files to export components:

```typescript
// Old import
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// New import
import { Button, Card } from "@/core/components/ui";
```

## Gradual Migration Approach

To minimize disruption, we recommend a gradual migration approach:

1. Create the new directory structure
2. Copy files to their new locations
3. Update imports in new files to use the new structure
4. Gradually update imports in existing files
5. Once all imports are updated, remove the old files

## Benefits of the New Structure

- **Better organization**: Code is organized by feature and responsibility
- **Improved maintainability**: Related code is grouped together
- **Easier navigation**: Clear directory structure makes it easier to find code
- **Scalability**: Structure can accommodate new features without becoming unwieldy
