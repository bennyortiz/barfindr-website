# BarFindr Component Guide

This guide provides an overview of the main components in the BarFindr application, explaining their purpose, props, and usage.

## Table of Contents

- [Layout Components](#layout-components)
  - [Navbar](#navbar)
  - [Footer](#footer)
  - [PageLayout](#pagelayout)
- [Bar Components](#bar-components)
  - [BarCard](#barcard)
  - [BarFilter](#barfilter)
  - [BarDetailTabs](#bardetailtabs)
- [Map Components](#map-components)
  - [Map](#map)
  - [SimpleMap](#simplemap)
  - [MapClient](#mapclient)
  - [MapInternal](#mapinternal)
- [UI Components](#ui-components)
  - [Button](#button)
  - [Card](#card)
  - [Container](#container)
  - [Input](#input)
  - [Badge](#badge)

## Layout Components

### Navbar

**Purpose**: Main navigation bar for the application.

**Location**: `src/components/layout/Navbar.tsx`

**Features**:
- Responsive design with mobile menu
- Search functionality
- Navigation links
- Smooth animations

**Usage**:
```jsx
import Navbar from "@/components/layout/Navbar";

function MyPage() {
  return (
    <>
      <Navbar />
      {/* Page content */}
    </>
  );
}
```

### Footer

**Purpose**: Footer for the application with links and information.

**Location**: `src/components/layout/Footer.tsx`

**Features**:
- Responsive grid layout
- Navigation links
- Copyright information

**Usage**:
```jsx
import Footer from "@/components/layout/Footer";

function MyPage() {
  return (
    <>
      {/* Page content */}
      <Footer />
    </>
  );
}
```

### PageLayout

**Purpose**: Main layout component for all pages.

**Location**: `src/components/layout/page-layout.tsx`

**Props**:
- `children`: Page content
- `className`: Optional className for the main element
- `containerClassName`: Optional className for the container
- `fullWidth`: Whether to use full width layout
- `noPadding`: Whether to remove padding from the container

**Usage**:
```jsx
import { PageLayout } from "@/components/layout/page-layout";

export default function MyPage() {
  return (
    <PageLayout>
      {/* Page content */}
    </PageLayout>
  );
}
```

## Bar Components

### BarCard

**Purpose**: Displays a card for a single bar with its basic information.

**Location**: `src/components/bars/BarCard.tsx`

**Props**:
- `bar`: The bar data to display
- `className`: Optional additional className for styling

**Usage**:
```jsx
import BarCard from "@/components/bars/BarCard";

function BarsList({ bars }) {
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {bars.map(bar => (
        <BarCard key={bar.id} bar={bar} />
      ))}
    </div>
  );
}
```

### BarFilter

**Purpose**: Provides filtering and sorting functionality for the bars listing page.

**Location**: `src/components/bars/BarFilter.tsx`

**Props**:
- `bars`: Array of all bars to be filtered
- `onFilterChange`: Callback function to receive the filtered bars
- `initialSearchQuery`: Optional initial search query

**Usage**:
```jsx
import BarFilter from "@/components/bars/BarFilter";

function BarsPage({ bars }) {
  const [filteredBars, setFilteredBars] = useState(bars);
  
  return (
    <div>
      <BarFilter 
        bars={bars} 
        onFilterChange={setFilteredBars} 
        initialSearchQuery="cocktail"
      />
      {/* Display filtered bars */}
    </div>
  );
}
```

### BarDetailTabs

**Purpose**: Displays detailed information about a bar in a tabbed interface.

**Location**: `src/components/bars/BarDetailTabs.tsx`

**Props**:
- `bar`: The bar data to display

**Usage**:
```jsx
import { BarDetailTabs } from "@/components/bars/BarDetailTabs";

function BarDetailPage({ bar }) {
  return (
    <div>
      <h1>{bar.name}</h1>
      <BarDetailTabs bar={bar} />
    </div>
  );
}
```

## Map Components

### Map

**Purpose**: Main map component that handles client-side rendering of the map.

**Location**: `src/components/map/Map.tsx`

**Props**:
- `bars`: Array of bars to display on the map
- `center`: Center coordinates for the map [latitude, longitude]
- `zoom`: Zoom level for the map
- `height`: Height of the map container
- `singleBar`: Whether this is a single bar detail view

**Usage**:
```jsx
import { Map } from "@/components/map/Map";

function MapPage({ bars }) {
  return (
    <div className="h-[500px]">
      <Map 
        bars={bars} 
        center={[30.27, -97.74]} 
        zoom={12} 
      />
    </div>
  );
}
```

### SimpleMap

**Purpose**: A simplified map component that handles client-side rendering.

**Location**: `src/components/map/SimpleMap.tsx`

**Props**:
- Same as `Map` component

**Usage**:
```jsx
import { SimpleMap } from "@/components/map/SimpleMap";

function BarDetailPage({ bar }) {
  return (
    <div className="h-[300px]">
      <SimpleMap 
        bars={[bar]} 
        center={[bar.location.lat, bar.location.lng]} 
        zoom={15}
        singleBar={true}
      />
    </div>
  );
}
```

### MapClient

**Purpose**: Client-side map component that renders the interactive Leaflet map.

**Location**: `src/components/map/MapClient.tsx`

**Note**: This component is used internally by `Map` and should not be used directly.

### MapInternal

**Purpose**: Internal map component that renders the Leaflet map.

**Location**: `src/components/map/MapInternal.tsx`

**Note**: This component is used internally by `SimpleMap` and should not be used directly.

## UI Components

### Button

**Purpose**: Reusable button component with various styles.

**Location**: `src/components/ui/button.tsx`

**Props**:
- `variant`: Button style variant
- `size`: Button size
- `children`: Button content
- `className`: Additional CSS classes
- All standard button props

**Usage**:
```jsx
import { Button } from "@/components/ui/button";

function MyComponent() {
  return (
    <Button variant="default" size="md" onClick={handleClick}>
      Click Me
    </Button>
  );
}
```

### Card

**Purpose**: Card component for displaying content in a contained box.

**Location**: `src/components/ui/card.tsx`

**Components**:
- `Card`: Main card container
- `CardHeader`: Card header section
- `CardTitle`: Card title
- `CardDescription`: Card description
- `CardContent`: Card main content
- `CardFooter`: Card footer section

**Usage**:
```jsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

function MyComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
      </CardHeader>
      <CardContent>
        Card content goes here
      </CardContent>
    </Card>
  );
}
```

### Container

**Purpose**: Container component for consistent page width and padding.

**Location**: `src/components/ui/container.tsx`

**Props**:
- `children`: Container content
- `className`: Additional CSS classes

**Usage**:
```jsx
import { Container } from "@/components/ui/container";

function MyComponent() {
  return (
    <Container>
      Content with consistent width and padding
    </Container>
  );
}
```

### Input

**Purpose**: Styled input component.

**Location**: `src/components/ui/input.tsx`

**Props**:
- All standard input props
- `className`: Additional CSS classes

**Usage**:
```jsx
import { Input } from "@/components/ui/input";

function MyComponent() {
  return (
    <Input 
      type="text" 
      placeholder="Enter text..." 
      onChange={handleChange} 
    />
  );
}
```

### Badge

**Purpose**: Badge component for displaying tags or status.

**Location**: `src/components/ui/badge.tsx`

**Props**:
- `variant`: Badge style variant
- `children`: Badge content
- `className`: Additional CSS classes

**Usage**:
```jsx
import { Badge } from "@/components/ui/badge";

function MyComponent() {
  return (
    <Badge variant="outline">Tag Name</Badge>
  );
}
```

## Creating New Components

When creating new components:

1. Place the component in the appropriate folder based on its purpose
2. Use TypeScript for type safety
3. Add JSDoc comments to document the component and its props
4. Follow the existing naming conventions
5. Make the component as reusable as possible
6. Consider using composition for complex components
