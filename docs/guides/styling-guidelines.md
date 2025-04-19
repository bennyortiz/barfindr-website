# Styling Guidelines

This document provides guidelines for styling components and pages in the BarFindr application.

## Overview

BarFindr uses Tailwind CSS for styling, with a custom design system defined in `src/lib/design-system.ts`. This approach provides a consistent look and feel across the application while allowing for flexibility and customization.

## Design System

The design system defines the following:

- Colors
- Typography
- Spacing
- Breakpoints
- Shadows
- Borders
- Transitions

For more details, see the [Design System](../reference/design-system.md) documentation.

## Tailwind CSS

Tailwind CSS is a utility-first CSS framework that allows you to build designs directly in your markup. BarFindr uses Tailwind CSS for all styling, with custom configuration in `tailwind.config.js`.

### Basic Usage

```jsx
<div className="p-4 bg-white rounded-lg shadow-md">
  <h2 className="text-xl font-semibold text-gray-900">Title</h2>
  <p className="mt-2 text-gray-600">Content</p>
</div>
```

### Responsive Design

Use Tailwind's responsive prefixes to apply styles at different breakpoints:

```jsx
<div className="p-4 md:p-6 lg:p-8">
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {/* Content */}
  </div>
</div>
```

### Dark Mode

BarFindr supports dark mode using Tailwind's dark mode variant:

```jsx
<div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
  {/* Content */}
</div>
```

## CSS Utilities

BarFindr includes several CSS utility classes to help with common patterns:

### Image Container

```jsx
<div className="image-container aspect-video">
  <Image
    src="/path/to/image.jpg"
    alt="Description"
    fill
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  />
</div>
```

For more details, see the [CSS Utilities](../components/css-utilities.md) documentation.

## Component Styling

### Using the `cn` Utility

The `cn` utility function is a wrapper around the `clsx` and `tailwind-merge` libraries. It allows you to conditionally apply classes and merge Tailwind classes correctly:

```jsx
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

### Component Variants

For components with multiple variants, use a consistent approach:

```jsx
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "underline-offset-4 hover:underline text-primary",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-3 rounded-md",
        lg: "h-11 px-8 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({ className, variant, size, ...props }) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
```

## Layout Patterns

### Container

Use the `Container` component for consistent width and padding:

```jsx
import { Container } from "@/core/components/ui/container";

<Container>
  {/* Content with consistent width and padding */}
</Container>
```

### Grid Layouts

Use Tailwind's grid utilities for grid layouts:

```jsx
// Basic grid
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
  {/* Grid items */}
</div>

// Grid with sidebar
<div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
  <main>
    {/* Main content */}
  </main>
  <aside>
    {/* Sidebar content */}
  </aside>
</div>
```

### Flexbox Layouts

Use Tailwind's flex utilities for flexbox layouts:

```jsx
// Horizontal layout
<div className="flex items-center space-x-4">
  {/* Flex items */}
</div>

// Vertical layout
<div className="flex flex-col space-y-4">
  {/* Flex items */}
</div>
```

## Spacing

Use Tailwind's spacing utilities for consistent spacing:

```jsx
// Margin
<div className="mt-4 mb-6 mx-auto">
  {/* Content */}
</div>

// Padding
<div className="pt-4 pb-6 px-4">
  {/* Content */}
</div>

// Gap
<div className="flex flex-col gap-4">
  {/* Flex items */}
</div>
```

## Typography

Use Tailwind's typography utilities for consistent typography:

```jsx
// Headings
<h1 className="text-3xl font-bold">Heading 1</h1>
<h2 className="text-2xl font-semibold">Heading 2</h2>
<h3 className="text-xl font-medium">Heading 3</h3>

// Body text
<p className="text-base">Body text</p>
<p className="text-sm">Small text</p>

// Text colors
<p className="text-gray-900 dark:text-gray-100">Primary text</p>
<p className="text-gray-600 dark:text-gray-400">Secondary text</p>
```

## Colors

Use the design system colors for consistent colors:

```jsx
// Background colors
<div className="bg-white dark:bg-gray-800">
  {/* Content */}
</div>

// Text colors
<p className="text-gray-900 dark:text-gray-100">Text</p>

// Border colors
<div className="border border-gray-200 dark:border-gray-700">
  {/* Content */}
</div>
```

## Best Practices

1. **Use the design system**
   - Follow the design system for colors, typography, spacing, etc.
   - Use the design system variables in `src/lib/design-system.ts`

2. **Use Tailwind utilities**
   - Use Tailwind utilities for styling
   - Avoid custom CSS when possible

3. **Use responsive design**
   - Make all components and pages responsive
   - Test on different screen sizes

4. **Use dark mode**
   - Support dark mode for all components and pages
   - Test in both light and dark mode

5. **Use consistent spacing**
   - Use consistent spacing throughout the application
   - Follow the spacing scale in the design system

6. **Use consistent typography**
   - Use consistent typography throughout the application
   - Follow the typography scale in the design system

7. **Use consistent colors**
   - Use consistent colors throughout the application
   - Follow the color palette in the design system

8. **Use the `cn` utility**
   - Use the `cn` utility for conditional classes
   - Use the `cn` utility for merging classes

9. **Use component variants**
   - Use component variants for different styles
   - Use the `cva` utility for component variants

10. **Use layout patterns**
    - Use the `Container` component for consistent width and padding
    - Use grid and flexbox for layouts

## Related Documentation

- [Component System](../components/component-system.md) - Overview of the component system
- [CSS Utilities](../components/css-utilities.md) - Documentation for CSS utilities
- [Design System](../reference/design-system.md) - Design tokens and variables
