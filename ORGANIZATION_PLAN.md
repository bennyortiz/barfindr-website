# BarFindr Codebase Organization Plan

## Directory Structure

```
barfindr/
├── public/               # Static assets
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── bars/         # Bar listing and detail pages
│   │   ├── happy-hours/  # Happy hour pages
│   │   └── ...
│   ├── core/             # Core application components and utilities
│   │   ├── components/   # Shared components
│   │   │   ├── layout/   # Layout components
│   │   │   └── ui/       # UI components
│   │   ├── hooks/        # Shared hooks
│   │   └── utils/        # Shared utilities
│   ├── features/         # Feature-specific code
│   │   ├── bars/         # Bar-related features
│   │   │   ├── components/ # Bar-specific components
│   │   │   ├── hooks/    # Bar-specific hooks
│   │   │   └── utils/    # Bar-specific utilities
│   │   ├── maps/         # Map-related features
│   │   └── happy-hours/  # Happy hour features
│   ├── lib/              # Library code and configurations
│   │   ├── design-system.ts # Design system configuration
│   │   └── ...
│   ├── styles/           # Global styles
│   └── types/            # TypeScript type definitions
└── ...
```

## Naming Conventions

- **Components**: Use PascalCase for component files (e.g., `BarCard.tsx`)
- **Utilities**: Use kebab-case for utility files (e.g., `date-utils.ts`)
- **Hooks**: Use camelCase with 'use' prefix (e.g., `useBarData.ts`)
- **Types**: Use PascalCase for type definitions (e.g., `Bar.ts`)

## Import Patterns

- Use absolute imports with aliases:
  - `@/core` for core components and utilities
  - `@/features` for feature-specific code
  - `@/lib` for library code
  - `@/styles` for styles
  - `@/types` for type definitions

## Component Organization

### Core Components

Core components are shared across the application and should be placed in `src/core/components`.

- **Layout Components**: Components that define the structure of pages (e.g., `PageLayout`, `Navbar`)
- **UI Components**: Reusable UI elements (e.g., `Button`, `Card`)

### Feature Components

Feature components are specific to a particular feature and should be placed in `src/features/{feature}/components`.

- **Bar Components**: Components related to bars (e.g., `BarCard`, `BarDetailTabs`)
- **Map Components**: Components related to maps (e.g., `Map`, `MapMarker`)
- **Happy Hour Components**: Components related to happy hours (e.g., `HappyHourCard`)

## Implementation Steps

1. Create the new directory structure
2. Move components to their appropriate directories
3. Update imports to use the new structure
4. Create index files for exports
5. Update documentation

## Benefits

- **Improved organization**: Code is organized by feature and responsibility
- **Better maintainability**: Related code is grouped together
- **Easier navigation**: Clear directory structure makes it easier to find code
- **Scalability**: Structure can accommodate new features without becoming unwieldy

## Specific Reorganization Tasks

### 1. Create New Directory Structure

```bash
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
```

### 2. Move Components to Appropriate Directories

#### Core Components

- Move layout components to `src/core/components/layout`:
  - `src/components/layout/Footer.tsx` → `src/core/components/layout/Footer.tsx`
  - `src/components/layout/Navbar.tsx` → `src/core/components/layout/Navbar.tsx`
  - `src/components/layout/page-layout.tsx` → `src/core/components/layout/PageLayout.tsx`
  - `src/components/templates/DetailPage.tsx` → `src/core/components/layout/DetailPage.tsx`
  - `src/components/templates/StandardPage.tsx` → `src/core/components/layout/StandardPage.tsx`

- Move UI components to `src/core/components/ui`:
  - All files from `src/components/ui/` → `src/core/components/ui/`

#### Feature Components

- Move bar components to `src/features/bars/components`:
  - `src/components/bars/BarCard.tsx` → `src/features/bars/components/BarCard.tsx`
  - `src/components/bars/BarDetailTabs.tsx` → `src/features/bars/components/BarDetailTabs.tsx`
  - `src/components/bars/BarFilter.tsx` → `src/features/bars/components/BarFilter.tsx`
  - `src/components/bars/EnhancedBarCard.tsx` → `src/features/bars/components/EnhancedBarCard.tsx`

- Move map components to `src/features/maps/components`:
  - `src/components/map/Map.tsx` → `src/features/maps/components/Map.tsx`
  - `src/components/map/MapClient.tsx` → `src/features/maps/components/MapClient.tsx`
  - `src/components/map/MapInternal.tsx` → `src/features/maps/components/MapInternal.tsx`
  - `src/components/map/SimpleMap.tsx` → `src/features/maps/components/SimpleMap.tsx`

#### Hooks and Utils

- Move hooks to appropriate directories:
  - `src/hooks/useBarData.ts` → `src/features/bars/hooks/useBarData.ts`

- Move utils to appropriate directories:
  - `src/utils/bar-utils.ts` → `src/features/bars/utils/bar-utils.ts`
  - `src/utils/animation-utils.ts` → `src/core/utils/animation-utils.ts`
  - `src/utils/date-utils.ts` → `src/core/utils/date-utils.ts`

### 3. Create Index Files for Exports

Create index files in each directory to export the components, hooks, and utilities.

### 4. Update Imports

Update imports in all files to use the new directory structure.

### 5. Clean Up Duplicate Files

Remove duplicate files after ensuring the new structure works correctly.

### 6. Update jsconfig.json

Update the `jsconfig.json` file to include the new path aliases.
