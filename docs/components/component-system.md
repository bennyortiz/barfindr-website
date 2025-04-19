# Component System

This document provides a comprehensive guide to the component system used in the BarFindr application. Understanding this system will help you maintain consistency and make it easier to create new features.

## Component Organization

The component system is organized into the following categories:

1. **Core Components** (`src/core/components/`)
   - **UI Components** (`src/core/components/ui/`)
     - Reusable UI elements like buttons, cards, inputs, etc.
   - **Layout Components** (`src/core/components/layout/`)
     - Page layouts and structural components

2. **Feature Components** (`src/features/`)
   - **Bar Components** (`src/features/bars/components/`)
     - Components specific to bar functionality
   - **Map Components** (`src/features/maps/components/`)
     - Components for map functionality
   - **Other feature-specific components**

## Core UI Components

These are the foundational UI components used throughout the application.

### Button

```tsx
import { Button } from "@/core/components/ui/button";

<Button variant="default" size="default">Click Me</Button>
```

**Variants:** default, outline, secondary, ghost, link, destructive

**Sizes:** default, sm, lg, icon

### Card

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/core/components/ui/card";

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description</CardDescription>
  </CardHeader>
  <CardContent>
    {/* Card content */}
  </CardContent>
  <CardFooter>
    {/* Card footer */}
  </CardFooter>
</Card>
```

### Input

```tsx
import { Input } from "@/core/components/ui/input";

<Input placeholder="Enter text..." />
```

### Badge

```tsx
import { Badge } from "@/core/components/ui/badge";

<Badge variant="default">New</Badge>
```

**Variants:** default, secondary, outline, destructive

### Container

```tsx
import { Container } from "@/core/components/ui/container";

<Container>
  {/* Content with consistent width and padding */}
</Container>
```

### Tabs

```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/core/components/ui/tabs";

<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Tab 1 content</TabsContent>
  <TabsContent value="tab2">Tab 2 content</TabsContent>
</Tabs>
```

### Enhanced Components

Enhanced versions of standard components with improved UX:

```tsx
import { EnhancedButton } from "@/core/components/ui/enhanced-button";
import { EnhancedInput } from "@/core/components/ui/enhanced-input";
import { EnhancedSearch } from "@/core/components/ui/enhanced-search";

<EnhancedButton>Click Me</EnhancedButton>
<EnhancedInput placeholder="Enter text..." />
<EnhancedSearch placeholder="Search..." />
```

## Feature Components

### Bar Components

```tsx
import { BarCard } from "@/features/bars/components/BarCard";
import { BarDetailTabs } from "@/features/bars/components/BarDetailTabs";
import { BarFilter } from "@/features/bars/components/BarFilter";
import { EnhancedBarCard } from "@/features/bars/components/EnhancedBarCard";

<BarCard bar={bar} />
<BarDetailTabs bar={bar} />
<BarFilter onFilterChange={handleFilterChange} />
<EnhancedBarCard bar={bar} />
```

### Map Components

```tsx
import { Map } from "@/features/maps/components/Map";
import { SimpleMap } from "@/features/maps/components/SimpleMap";

<Map bars={bars} center={[30.27, -97.74]} zoom={12} />
<SimpleMap bars={bars} height="500px" />
```

## Component Hooks

Custom hooks for component functionality:

```tsx
import { useBarData } from "@/features/bars/hooks/useBarData";

const { bars, loading, error } = useBarData();
```

## Component Utilities

Utility functions for components:

```tsx
import { cn } from "@/lib/utils";
import { formatDate } from "@/core/utils/date-utils";
import { animateElement } from "@/core/utils/animation-utils";
import { filterBarsByAttribute } from "@/features/bars/utils/bar-utils";

// Combine class names conditionally
const className = cn("base-class", isActive && "active-class");

// Format a date
const formattedDate = formatDate(new Date(), "MM/dd/yyyy");

// Animate an element
animateElement(elementRef, { opacity: 1 }, { duration: 0.3 });

// Filter bars by attribute
const filteredBars = filterBarsByAttribute(bars, "neighborhood", "downtown");
```

## Design System Integration

Components are integrated with the design system defined in `src/lib/design-system.ts`. This ensures consistent spacing, colors, and other visual properties across the application.

```tsx
import { designSystem } from "@/lib/design-system";

// Access design system values
const maxWidth = designSystem.layout.maxWidth;
const padding = designSystem.layout.padding.container.md;
const gap = designSystem.layout.gap.md;
```

## Best Practices

1. **Use the appropriate component category:**
   - Use core UI components for basic UI elements
   - Use feature components for domain-specific functionality
   - Create new feature components when needed

2. **Maintain consistent naming:**
   - Use PascalCase for component names
   - Use camelCase for props and functions
   - Use descriptive names that indicate the component's purpose

3. **Component structure:**
   - Keep components focused on a single responsibility
   - Extract complex logic to custom hooks
   - Use composition over inheritance

4. **Documentation:**
   - Add JSDoc comments to components with descriptions and examples
   - Document props with descriptions and types
   - Update this guide when adding new component categories

5. **Testing:**
   - Write tests for components with complex logic
   - Test different states and edge cases

## Creating New Components

When creating new components:

1. Place them in the appropriate directory based on their purpose
2. Follow the existing naming conventions
3. Use TypeScript for type safety
4. Add JSDoc comments for documentation
5. Export them from the appropriate index file
6. Update this guide if creating a new component category

## Related Documentation

- [Layout System](./layout-system.md) - Documentation for layout components
- [UI Components](./ui-components.md) - Documentation for UI components
- [Bar Components](./bar-components.md) - Documentation for bar-specific components
- [Map Components](./map-components.md) - Documentation for map components
- [CSS Utilities](./css-utilities.md) - Documentation for CSS utilities
