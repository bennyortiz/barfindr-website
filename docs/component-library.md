# BarFindr Component Library

This document provides an overview of the reusable components available in the BarFindr project.

## Core Components

### Layout Components

#### StandardPage

A standard page layout with proper spacing and container constraints.

```jsx
import { StandardPage } from "@/core/components/layout/StandardPage";

export default function MyPage() {
  return (
    <StandardPage
      title="Page Title"
      description="Page description"
    >
      {/* Page content */}
    </StandardPage>
  );
}
```

#### DetailPage

A layout specifically designed for detail pages with hero sections.

```jsx
import { DetailPage } from "@/core/components/layout/DetailPage";

export default function DetailView() {
  return (
    <DetailPage>
      {/* Hero section */}
      <DetailPage.Hero>
        {/* Hero content */}
      </DetailPage.Hero>
      
      {/* Main content */}
      <DetailPage.Content>
        {/* Page content */}
      </DetailPage.Content>
    </DetailPage>
  );
}
```

### UI Components

#### Button

Standard button component with variants.

```jsx
import { Button } from "@/core/components/ui/button";

<Button variant="default">Default Button</Button>
<Button variant="destructive">Destructive Button</Button>
<Button variant="outline">Outline Button</Button>
<Button variant="ghost">Ghost Button</Button>
```

#### EnhancedButton

Button with additional styling and animations.

```jsx
import { EnhancedButton } from "@/core/components/ui/enhanced-button";

<EnhancedButton variant="apple-primary">Enhanced Button</EnhancedButton>
```

#### Card

Card component for displaying content in a contained box.

```jsx
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

#### Tabs

Tabbed interface for organizing content.

```jsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/core/components/ui/tabs";

<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">
    Content for tab 1
  </TabsContent>
  <TabsContent value="tab2">
    Content for tab 2
  </TabsContent>
</Tabs>
```

#### Badge

Badge component for labels and tags.

```jsx
import { Badge } from "@/core/components/ui/badge";

<Badge>New</Badge>
<Badge variant="outline">Tag</Badge>
```

#### Hero

Hero section component for page headers.

```jsx
import { Hero } from "@/core/components/ui/hero";

<Hero
  title="Page Title"
  description="Page description"
  image="/hero-image.jpg"
/>
```

## Feature Components

### Bar Components

#### BarCard

Card component for displaying bar information.

```jsx
import { BarCard } from "@/features/bars/components/BarCard";

<BarCard bar={barData} />
```

#### EnhancedBarCard

Bar card with animations and enhanced styling.

```jsx
import { EnhancedBarCard } from "@/features/bars/components/EnhancedBarCard";

<EnhancedBarCard 
  bar={barData} 
  featured={true}
  delay={0}
/>
```

#### BarDetailTabs

Tabbed interface for bar details.

```jsx
import { BarDetailTabs } from "@/features/bars/components/BarDetailTabs";

<BarDetailTabs bar={barData} />
```

#### BarRatings

Component for displaying bar ratings.

```jsx
import { BarRatings } from "@/features/bars/components/BarRatings";

<BarRatings bar={barData} showDetailed={true} />
```

### Map Components

#### MapView

Interactive map component.

```jsx
import { MapView } from "@/features/map/components/MapView";

<MapView 
  bars={barsData}
  center={[30.2672, -97.7431]} // Austin coordinates
  zoom={13}
/>
```

## Best Practices

1. **Component Composition**: Compose complex UIs from smaller, reusable components
2. **Prop Documentation**: Document component props with TypeScript interfaces
3. **Default Props**: Provide sensible defaults for optional props
4. **Responsive Design**: Ensure components work well on all screen sizes
5. **Accessibility**: Include proper ARIA attributes and keyboard navigation

## Adding New Components

When creating new components:

1. Place them in the appropriate directory:
   - Core UI components: `src/core/components/ui/`
   - Layout components: `src/core/components/layout/`
   - Feature-specific components: `src/features/[feature]/components/`
2. Use TypeScript for type safety
3. Follow the established naming conventions
4. Document the component in this guide
