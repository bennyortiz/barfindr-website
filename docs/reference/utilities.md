# Utilities

This document provides an overview of the utility functions available in the BarFindr application.

## General Utilities

### `cn` - Class Name Utility

The `cn` utility function is a wrapper around the `clsx` and `tailwind-merge` libraries. It allows you to conditionally apply classes and merge Tailwind classes correctly.

**Location**: `src/lib/utils.ts`

**Usage**:

```tsx
import { cn } from "@/lib/utils";

function Button({ className, variant = "default", ...props }) {
  return (
    <button
      className={cn(
        "px-4 py-2 rounded-md font-medium",
        variant === "default" && "bg-blue-500 text-white hover:bg-blue-600",
        variant === "outline" && "border border-gray-300 hover:bg-gray-50",
        className
      )}
      {...props}
    />
  );
}
```

**Implementation**:

```typescript
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### `formatDate` - Date Formatting Utility

The `formatDate` utility function formats a date using the `date-fns` library.

**Location**: `src/core/utils/date-utils.ts`

**Usage**:

```tsx
import { formatDate } from "@/core/utils/date-utils";

function DateDisplay({ date }) {
  return <div>{formatDate(date, "MMMM d, yyyy")}</div>;
}
```

**Implementation**:

```typescript
import { format, parseISO } from "date-fns";

export function formatDate(date: Date | string, formatString: string = "PPP"): string {
  const dateObj = typeof date === "string" ? parseISO(date) : date;
  return format(dateObj, formatString);
}
```

### `slugify` - Slug Generation Utility

The `slugify` utility function converts a string to a URL-friendly slug.

**Location**: `src/lib/utils.ts`

**Usage**:

```typescript
import { slugify } from "@/lib/utils";

const slug = slugify("Hello World"); // "hello-world"
```

**Implementation**:

```typescript
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w\-]+/g, "") // Remove all non-word characters
    .replace(/\-\-+/g, "-"); // Replace multiple - with single -
}
```

## Bar Data Utilities

### `getBar` - Get Bar by ID or Slug

The `getBar` utility function gets a bar by ID or slug.

**Location**: `src/lib/bar-data.ts`

**Usage**:

```tsx
import { getBar } from "@/lib/bar-data";

function BarDetail({ id }) {
  const bar = getBar(id);
  
  if (!bar) {
    return <div>Bar not found</div>;
  }
  
  return <div>{bar.name}</div>;
}
```

**Implementation**:

```typescript
import { bars } from "./data";
import { Bar } from "./types";

export function getBar(idOrSlug: string): Bar | undefined {
  return bars.find(bar => bar.id === idOrSlug || bar.slug === idOrSlug);
}
```

### `getBarsByNeighborhood` - Get Bars by Neighborhood

The `getBarsByNeighborhood` utility function gets bars by neighborhood.

**Location**: `src/lib/bar-data.ts`

**Usage**:

```tsx
import { getBarsByNeighborhood } from "@/lib/bar-data";

function NeighborhoodBars({ neighborhood }) {
  const bars = getBarsByNeighborhood(neighborhood);
  
  return (
    <div>
      {bars.map(bar => (
        <BarCard key={bar.id} bar={bar} />
      ))}
    </div>
  );
}
```

**Implementation**:

```typescript
import { bars } from "./data";
import { Bar } from "./types";

export function getBarsByNeighborhood(neighborhood: string): Bar[] {
  return bars.filter(bar => bar.neighborhood === neighborhood);
}
```

### `getBarsByTag` - Get Bars by Tag

The `getBarsByTag` utility function gets bars by tag.

**Location**: `src/lib/bar-data.ts`

**Usage**:

```tsx
import { getBarsByTag } from "@/lib/bar-data";

function TaggedBars({ tag }) {
  const bars = getBarsByTag(tag);
  
  return (
    <div>
      {bars.map(bar => (
        <BarCard key={bar.id} bar={bar} />
      ))}
    </div>
  );
}
```

**Implementation**:

```typescript
import { bars } from "./data";
import { Bar } from "./types";

export function getBarsByTag(tag: string): Bar[] {
  return bars.filter(bar => bar.tags.includes(tag));
}
```

### `getBarsWithHappyHour` - Get Bars with Happy Hour

The `getBarsWithHappyHour` utility function gets bars with happy hour on a specific day.

**Location**: `src/lib/bar-data.ts`

**Usage**:

```tsx
import { getBarsWithHappyHour } from "@/lib/bar-data";

function HappyHourBars({ day }) {
  const bars = getBarsWithHappyHour(day);
  
  return (
    <div>
      {bars.map(bar => (
        <BarCard key={bar.id} bar={bar} />
      ))}
    </div>
  );
}
```

**Implementation**:

```typescript
import { bars } from "./data";
import { Bar, Hours } from "./types";

export function getBarsWithHappyHour(day: keyof Hours): Bar[] {
  return bars.filter(bar => bar.happyHour && bar.happyHour[day] !== null);
}
```

## Validation Utilities

### `validateBar` - Validate Bar Data

The `validateBar` utility function validates a bar object.

**Location**: `src/lib/validation.ts`

**Usage**:

```typescript
import { validateBar } from "@/lib/validation";

function addBar(bar) {
  if (!validateBar(bar)) {
    throw new Error("Invalid bar data");
  }
  
  // Add bar to database
}
```

**Implementation**:

```typescript
import { Bar } from "./types";

export function validateBar(bar: Partial<Bar>): bar is Bar {
  return (
    typeof bar.id === "string" &&
    typeof bar.name === "string" &&
    typeof bar.slug === "string" &&
    typeof bar.description === "string" &&
    typeof bar.imageUrl === "string" &&
    validateAddress(bar.address) &&
    validateLocation(bar.location) &&
    validateHours(bar.hours) &&
    typeof bar.price === "string" &&
    Array.isArray(bar.tags) &&
    typeof bar.neighborhood === "string"
  );
}

function validateAddress(address: any): boolean {
  return (
    address &&
    typeof address.street === "string" &&
    typeof address.city === "string" &&
    typeof address.state === "string" &&
    typeof address.zip === "string"
  );
}

function validateLocation(location: any): boolean {
  return (
    location &&
    typeof location.lat === "number" &&
    typeof location.lng === "number"
  );
}

function validateHours(hours: any): boolean {
  return (
    hours &&
    (hours.monday === null || typeof hours.monday === "string") &&
    (hours.tuesday === null || typeof hours.tuesday === "string") &&
    (hours.wednesday === null || typeof hours.wednesday === "string") &&
    (hours.thursday === null || typeof hours.thursday === "string") &&
    (hours.friday === null || typeof hours.friday === "string") &&
    (hours.saturday === null || typeof hours.saturday === "string") &&
    (hours.sunday === null || typeof hours.sunday === "string")
  );
}
```

## Animation Utilities

### `fadeIn` - Fade In Animation

The `fadeIn` utility function creates a fade-in animation using Framer Motion.

**Location**: `src/core/utils/animation-utils.ts`

**Usage**:

```tsx
import { fadeIn } from "@/core/utils/animation-utils";
import { motion } from "framer-motion";

function FadeInComponent() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeIn()}
    >
      Content that fades in
    </motion.div>
  );
}
```

**Implementation**:

```typescript
export function fadeIn(duration: number = 0.5, delay: number = 0) {
  return {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration,
        delay,
      },
    },
  };
}
```

### `slideIn` - Slide In Animation

The `slideIn` utility function creates a slide-in animation using Framer Motion.

**Location**: `src/core/utils/animation-utils.ts`

**Usage**:

```tsx
import { slideIn } from "@/core/utils/animation-utils";
import { motion } from "framer-motion";

function SlideInComponent() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={slideIn("left")}
    >
      Content that slides in from the left
    </motion.div>
  );
}
```

**Implementation**:

```typescript
export function slideIn(direction: "left" | "right" | "up" | "down", duration: number = 0.5, delay: number = 0) {
  const x = direction === "left" ? "-100%" : direction === "right" ? "100%" : 0;
  const y = direction === "up" ? "-100%" : direction === "down" ? "100%" : 0;
  
  return {
    hidden: {
      x,
      y,
      opacity: 0,
    },
    visible: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        duration,
        delay,
      },
    },
  };
}
```

## String Utilities

### `truncate` - Truncate Text

The `truncate` utility function truncates text to a specified length.

**Location**: `src/lib/utils.ts`

**Usage**:

```tsx
import { truncate } from "@/lib/utils";

function Description({ text }) {
  return <p>{truncate(text, 100)}</p>;
}
```

**Implementation**:

```typescript
export function truncate(text: string, length: number): string {
  if (text.length <= length) {
    return text;
  }
  
  return text.slice(0, length) + "...";
}
```

### `capitalize` - Capitalize Text

The `capitalize` utility function capitalizes the first letter of a string.

**Location**: `src/lib/utils.ts`

**Usage**:

```tsx
import { capitalize } from "@/lib/utils";

function Title({ text }) {
  return <h1>{capitalize(text)}</h1>;
}
```

**Implementation**:

```typescript
export function capitalize(text: string): string {
  if (!text) return text;
  return text.charAt(0).toUpperCase() + text.slice(1);
}
```

## Array Utilities

### `groupBy` - Group Array by Key

The `groupBy` utility function groups an array by a key.

**Location**: `src/lib/utils.ts`

**Usage**:

```tsx
import { groupBy } from "@/lib/utils";

function BarsByNeighborhood({ bars }) {
  const barsByNeighborhood = groupBy(bars, "neighborhood");
  
  return (
    <div>
      {Object.entries(barsByNeighborhood).map(([neighborhood, bars]) => (
        <div key={neighborhood}>
          <h2>{neighborhood}</h2>
          {bars.map(bar => (
            <BarCard key={bar.id} bar={bar} />
          ))}
        </div>
      ))}
    </div>
  );
}
```

**Implementation**:

```typescript
export function groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
  return array.reduce((result, item) => {
    const groupKey = String(item[key]);
    result[groupKey] = result[groupKey] || [];
    result[groupKey].push(item);
    return result;
  }, {} as Record<string, T[]>);
}
```

### `sortBy` - Sort Array by Key

The `sortBy` utility function sorts an array by a key.

**Location**: `src/lib/utils.ts`

**Usage**:

```tsx
import { sortBy } from "@/lib/utils";

function SortedBars({ bars }) {
  const sortedBars = sortBy(bars, "name");
  
  return (
    <div>
      {sortedBars.map(bar => (
        <BarCard key={bar.id} bar={bar} />
      ))}
    </div>
  );
}
```

**Implementation**:

```typescript
export function sortBy<T>(array: T[], key: keyof T, direction: "asc" | "desc" = "asc"): T[] {
  return [...array].sort((a, b) => {
    const aValue = a[key];
    const bValue = b[key];
    
    if (aValue < bValue) {
      return direction === "asc" ? -1 : 1;
    }
    
    if (aValue > bValue) {
      return direction === "asc" ? 1 : -1;
    }
    
    return 0;
  });
}
```

## Related Documentation

- [Data Management](../architecture/data-management.md) - How data is stored and managed
- [Design Patterns](../architecture/design-patterns.md) - Common design patterns used in the codebase
