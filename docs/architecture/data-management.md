# Data Management

This document explains how data is stored and managed in the BarFindr application.

## Overview

BarFindr uses a combination of static data files and client-side state management to handle data. This approach provides several benefits:

- **Simplicity**: No need for a complex backend or database
- **Performance**: Static data can be loaded quickly and cached
- **Flexibility**: Easy to update data without changing code
- **SEO**: Data is available at build time for SEO

## Data Sources

### Static Data Files

Bar data is stored in individual JSON files in the `src/data/bars` directory. Each bar has its own file, which makes it easy to add, update, or remove bars without affecting the rest of the application.

Example bar data file (`src/data/bars/roosevelt-room.json`):

```json
{
  "id": "roosevelt-room",
  "name": "The Roosevelt Room",
  "slug": "roosevelt-room",
  "description": "Upscale cocktail bar with a speakeasy vibe, offering classic and innovative drinks in a stylish setting.",
  "imageUrl": "/images/bars/roosevelt-room.jpg",
  "address": {
    "street": "307 W 5th St",
    "city": "Austin",
    "state": "TX",
    "zip": "78701"
  },
  "location": {
    "lat": 30.267153,
    "lng": -97.743057
  },
  "phone": "512-494-4094",
  "website": "https://www.therooseveltroomatx.com/",
  "hours": {
    "monday": "5:00 PM - 2:00 AM",
    "tuesday": "5:00 PM - 2:00 AM",
    "wednesday": "5:00 PM - 2:00 AM",
    "thursday": "5:00 PM - 2:00 AM",
    "friday": "5:00 PM - 2:00 AM",
    "saturday": "5:00 PM - 2:00 AM",
    "sunday": "5:00 PM - 2:00 AM"
  },
  "happyHour": {
    "monday": "5:00 PM - 7:00 PM",
    "tuesday": "5:00 PM - 7:00 PM",
    "wednesday": "5:00 PM - 7:00 PM",
    "thursday": "5:00 PM - 7:00 PM",
    "friday": "5:00 PM - 7:00 PM",
    "saturday": null,
    "sunday": null
  },
  "price": "$$$",
  "tags": ["cocktails", "speakeasy", "upscale"],
  "features": ["reservations", "full-bar", "craft-cocktails"],
  "neighborhood": "downtown",
  "rating": 4.8,
  "reviews": 450
}
```

### Data Loading

Data is loaded using the `src/lib/data.ts` file, which imports all bar data files and exports them as an array:

```typescript
// src/lib/data.ts

// Import bar data
import rooseveltRoom from '@/data/bars/roosevelt-room.json';
import whislersTx from '@/data/bars/whislers-tx.json';
import drinkwell from '@/data/bars/drinkwell.json';
// ... more imports

// Export bars array
export const bars = [
  rooseveltRoom,
  whislersTx,
  drinkwell,
  // ... more bars
];
```

## Data Types

BarFindr uses TypeScript to define the structure of data. The main data types are defined in `src/lib/types.ts`:

```typescript
// src/lib/types.ts

export interface Bar {
  id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  address: Address;
  location: Location;
  phone?: string;
  website?: string;
  hours: Hours;
  happyHour?: Hours;
  price: string;
  tags: string[];
  features?: string[];
  neighborhood: string;
  rating?: number;
  reviews?: number;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
}

export interface Location {
  lat: number;
  lng: number;
}

export interface Hours {
  monday: string | null;
  tuesday: string | null;
  wednesday: string | null;
  thursday: string | null;
  friday: string | null;
  saturday: string | null;
  sunday: string | null;
}

// ... more types
```

## Data Access

### Bar Data Utilities

The `src/lib/bar-data.ts` file provides utilities for accessing bar data:

```typescript
// src/lib/bar-data.ts

import { bars } from './data';
import { Bar } from './types';

/**
 * Get a bar by ID or slug
 * 
 * @param idOrSlug - The ID or slug of the bar
 * @returns The bar, or undefined if not found
 */
export function getBar(idOrSlug: string): Bar | undefined {
  return bars.find(bar => bar.id === idOrSlug || bar.slug === idOrSlug);
}

/**
 * Get bars by neighborhood
 * 
 * @param neighborhood - The neighborhood to filter by
 * @returns An array of bars in the neighborhood
 */
export function getBarsByNeighborhood(neighborhood: string): Bar[] {
  return bars.filter(bar => bar.neighborhood === neighborhood);
}

/**
 * Get bars by tag
 * 
 * @param tag - The tag to filter by
 * @returns An array of bars with the tag
 */
export function getBarsByTag(tag: string): Bar[] {
  return bars.filter(bar => bar.tags.includes(tag));
}

/**
 * Get bars with happy hour on a specific day
 * 
 * @param day - The day of the week (lowercase)
 * @returns An array of bars with happy hour on the day
 */
export function getBarsWithHappyHour(day: keyof Hours): Bar[] {
  return bars.filter(bar => bar.happyHour && bar.happyHour[day] !== null);
}

// ... more utilities
```

### Custom Hooks

Custom hooks are used to access and manipulate data in components:

```typescript
// src/features/bars/hooks/useBarData.ts

import { useState, useEffect } from 'react';
import { Bar } from '@/lib/types';
import { bars } from '@/lib/data';

interface UseBarDataOptions {
  initialFilters?: {
    neighborhood?: string;
    tag?: string;
    price?: string;
    feature?: string;
  };
}

interface UseBarDataResult {
  bars: Bar[];
  loading: boolean;
  error: Error | null;
  filterByNeighborhood: (neighborhood: string | null) => void;
  filterByTag: (tag: string | null) => void;
  filterByPrice: (price: string | null) => void;
  filterByFeature: (feature: string | null) => void;
  resetFilters: () => void;
}

export function useBarData({ initialFilters = {} }: UseBarDataOptions = {}): UseBarDataResult {
  const [filteredBars, setFilteredBars] = useState<Bar[]>(bars);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [filters, setFilters] = useState({
    neighborhood: initialFilters.neighborhood || null,
    tag: initialFilters.tag || null,
    price: initialFilters.price || null,
    feature: initialFilters.feature || null,
  });

  useEffect(() => {
    try {
      setLoading(true);
      
      let result = [...bars];
      
      if (filters.neighborhood) {
        result = result.filter(bar => bar.neighborhood === filters.neighborhood);
      }
      
      if (filters.tag) {
        result = result.filter(bar => bar.tags.includes(filters.tag!));
      }
      
      if (filters.price) {
        result = result.filter(bar => bar.price === filters.price);
      }
      
      if (filters.feature) {
        result = result.filter(bar => bar.features?.includes(filters.feature!));
      }
      
      setFilteredBars(result);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to filter bars'));
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const filterByNeighborhood = (neighborhood: string | null) => {
    setFilters(prev => ({ ...prev, neighborhood }));
  };

  const filterByTag = (tag: string | null) => {
    setFilters(prev => ({ ...prev, tag }));
  };

  const filterByPrice = (price: string | null) => {
    setFilters(prev => ({ ...prev, price }));
  };

  const filterByFeature = (feature: string | null) => {
    setFilters(prev => ({ ...prev, feature }));
  };

  const resetFilters = () => {
    setFilters({
      neighborhood: null,
      tag: null,
      price: null,
      feature: null,
    });
  };

  return {
    bars: filteredBars,
    loading,
    error,
    filterByNeighborhood,
    filterByTag,
    filterByPrice,
    filterByFeature,
    resetFilters,
  };
}
```

## State Management

BarFindr uses React hooks for state management:

### Component State

For simple component state, `useState` is used:

```tsx
function BarFilter() {
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  
  // ...
}
```

### Complex State

For more complex state, `useReducer` is used:

```tsx
type FilterState = {
  neighborhood: string | null;
  tag: string | null;
  price: string | null;
  feature: string | null;
};

type FilterAction =
  | { type: 'SET_NEIGHBORHOOD'; payload: string | null }
  | { type: 'SET_TAG'; payload: string | null }
  | { type: 'SET_PRICE'; payload: string | null }
  | { type: 'SET_FEATURE'; payload: string | null }
  | { type: 'RESET' };

function filterReducer(state: FilterState, action: FilterAction): FilterState {
  switch (action.type) {
    case 'SET_NEIGHBORHOOD':
      return { ...state, neighborhood: action.payload };
    case 'SET_TAG':
      return { ...state, tag: action.payload };
    case 'SET_PRICE':
      return { ...state, price: action.payload };
    case 'SET_FEATURE':
      return { ...state, feature: action.payload };
    case 'RESET':
      return {
        neighborhood: null,
        tag: null,
        price: null,
        feature: null,
      };
    default:
      return state;
  }
}

function BarFilter() {
  const [state, dispatch] = useReducer(filterReducer, {
    neighborhood: null,
    tag: null,
    price: null,
    feature: null,
  });
  
  // ...
}
```

### Shared State

For sharing state between components, `useContext` is used:

```tsx
// src/features/bars/context/BarContext.tsx

import { createContext, useContext, useReducer, ReactNode } from 'react';
import { Bar } from '@/lib/types';
import { bars } from '@/lib/data';

type BarState = {
  bars: Bar[];
  filters: {
    neighborhood: string | null;
    tag: string | null;
    price: string | null;
    feature: string | null;
  };
};

type BarAction =
  | { type: 'SET_NEIGHBORHOOD'; payload: string | null }
  | { type: 'SET_TAG'; payload: string | null }
  | { type: 'SET_PRICE'; payload: string | null }
  | { type: 'SET_FEATURE'; payload: string | null }
  | { type: 'RESET_FILTERS' };

const initialState: BarState = {
  bars,
  filters: {
    neighborhood: null,
    tag: null,
    price: null,
    feature: null,
  },
};

function barReducer(state: BarState, action: BarAction): BarState {
  switch (action.type) {
    case 'SET_NEIGHBORHOOD':
      return {
        ...state,
        filters: { ...state.filters, neighborhood: action.payload },
      };
    case 'SET_TAG':
      return {
        ...state,
        filters: { ...state.filters, tag: action.payload },
      };
    case 'SET_PRICE':
      return {
        ...state,
        filters: { ...state.filters, price: action.payload },
      };
    case 'SET_FEATURE':
      return {
        ...state,
        filters: { ...state.filters, feature: action.payload },
      };
    case 'RESET_FILTERS':
      return {
        ...state,
        filters: {
          neighborhood: null,
          tag: null,
          price: null,
          feature: null,
        },
      };
    default:
      return state;
  }
}

const BarContext = createContext<{
  state: BarState;
  dispatch: React.Dispatch<BarAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

export function BarProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(barReducer, initialState);
  
  return (
    <BarContext.Provider value={{ state, dispatch }}>
      {children}
    </BarContext.Provider>
  );
}

export function useBarContext() {
  return useContext(BarContext);
}
```

## Data Validation

BarFindr uses TypeScript for data validation. The TypeScript compiler checks that data conforms to the defined types at build time.

For runtime validation, BarFindr uses simple validation functions:

```typescript
// src/lib/validation.ts

import { Bar } from './types';

/**
 * Validate a bar object
 * 
 * @param bar - The bar to validate
 * @returns Whether the bar is valid
 */
export function validateBar(bar: Partial<Bar>): bar is Bar {
  return (
    typeof bar.id === 'string' &&
    typeof bar.name === 'string' &&
    typeof bar.slug === 'string' &&
    typeof bar.description === 'string' &&
    typeof bar.imageUrl === 'string' &&
    validateAddress(bar.address) &&
    validateLocation(bar.location) &&
    validateHours(bar.hours) &&
    typeof bar.price === 'string' &&
    Array.isArray(bar.tags) &&
    typeof bar.neighborhood === 'string'
  );
}

// ... more validation functions
```

## Best Practices

1. **Use TypeScript**
   - Define types for all data structures
   - Use type guards for runtime validation

2. **Keep data separate from code**
   - Store data in separate files
   - Use utilities to access and manipulate data

3. **Use custom hooks**
   - Encapsulate data access logic in custom hooks
   - Provide a clean API for components

4. **Handle loading and error states**
   - Show loading indicators while data is loading
   - Display error messages when data loading fails

5. **Use context for shared state**
   - Share state between components using context
   - Keep context providers as high in the tree as needed

6. **Validate data**
   - Validate data at build time with TypeScript
   - Validate data at runtime with validation functions

## Related Documentation

- [Application Architecture](./application-architecture.md) - Overview of the application architecture
- [Adding New Bars](../guides/adding-new-bars.md) - How to add new bar data
