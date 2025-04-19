# Design System

This document provides an overview of the design system used in the BarFindr application.

## Overview

The design system is defined in `src/lib/design-system.ts` and provides a consistent set of design tokens for colors, typography, spacing, and more. These tokens are used throughout the application to ensure a consistent look and feel.

## Colors

### Primary Colors

```typescript
colors: {
  primary: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8',
    500: '#0ea5e9',
    600: '#0284c7',
    700: '#0369a1',
    800: '#075985',
    900: '#0c4a6e',
    950: '#082f49',
  },
  // ...
}
```

### Neutral Colors

```typescript
colors: {
  // ...
  neutral: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
    950: '#030712',
  },
  // ...
}
```

### Semantic Colors

```typescript
colors: {
  // ...
  success: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
    950: '#052e16',
  },
  warning: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
    950: '#451a03',
  },
  error: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
    950: '#450a0a',
  },
  // ...
}
```

## Typography

### Font Family

```typescript
typography: {
  fontFamily: {
    sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
    mono: ['var(--font-geist-mono)', 'monospace'],
  },
  // ...
}
```

### Font Size

```typescript
typography: {
  // ...
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
    '6xl': '3.75rem',
    '7xl': '4.5rem',
    '8xl': '6rem',
    '9xl': '8rem',
  },
  // ...
}
```

### Font Weight

```typescript
typography: {
  // ...
  fontWeight: {
    thin: '100',
    extralight: '200',
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900',
  },
  // ...
}
```

### Line Height

```typescript
typography: {
  // ...
  lineHeight: {
    none: '1',
    tight: '1.25',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.625',
    loose: '2',
  },
  // ...
}
```

### Letter Spacing

```typescript
typography: {
  // ...
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0em',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
  // ...
}
```

## Spacing

```typescript
spacing: {
  px: '1px',
  0: '0',
  0.5: '0.125rem',
  1: '0.25rem',
  1.5: '0.375rem',
  2: '0.5rem',
  2.5: '0.625rem',
  3: '0.75rem',
  3.5: '0.875rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  7: '1.75rem',
  8: '2rem',
  9: '2.25rem',
  10: '2.5rem',
  11: '2.75rem',
  12: '3rem',
  14: '3.5rem',
  16: '4rem',
  20: '5rem',
  24: '6rem',
  28: '7rem',
  32: '8rem',
  36: '9rem',
  40: '10rem',
  44: '11rem',
  48: '12rem',
  52: '13rem',
  56: '14rem',
  60: '15rem',
  64: '16rem',
  72: '18rem',
  80: '20rem',
  96: '24rem',
}
```

## Breakpoints

```typescript
breakpoints: {
  xs: '480px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
}
```

## Shadows

```typescript
shadows: {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
  none: 'none',
}
```

## Borders

```typescript
borders: {
  radius: {
    none: '0',
    sm: '0.125rem',
    DEFAULT: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
    full: '9999px',
  },
  width: {
    DEFAULT: '1px',
    0: '0px',
    2: '2px',
    4: '4px',
    8: '8px',
  },
}
```

## Layout

```typescript
layout: {
  maxWidth: {
    none: 'none',
    xs: '20rem',
    sm: '24rem',
    md: '28rem',
    lg: '32rem',
    xl: '36rem',
    '2xl': '42rem',
    '3xl': '48rem',
    '4xl': '56rem',
    '5xl': '64rem',
    '6xl': '72rem',
    '7xl': '80rem',
    full: '100%',
    min: 'min-content',
    max: 'max-content',
    fit: 'fit-content',
    prose: '65ch',
    screen: '100vw',
  },
  padding: {
    container: {
      DEFAULT: '1rem',
      sm: '2rem',
      md: '3rem',
      lg: '4rem',
      xl: '5rem',
      '2xl': '6rem',
    },
  },
  gap: {
    DEFAULT: '1rem',
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '2.5rem',
    '3xl': '3rem',
  },
}
```

## Transitions

```typescript
transitions: {
  duration: {
    DEFAULT: '150ms',
    75: '75ms',
    100: '100ms',
    150: '150ms',
    200: '200ms',
    300: '300ms',
    500: '500ms',
    700: '700ms',
    1000: '1000ms',
  },
  timing: {
    DEFAULT: 'cubic-bezier(0.4, 0, 0.2, 1)',
    linear: 'linear',
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
    'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
}
```

## Using the Design System

### In Components

```tsx
import { designSystem } from '@/lib/design-system';

function MyComponent() {
  return (
    <div
      style={{
        color: designSystem.colors.primary[500],
        fontSize: designSystem.typography.fontSize.lg,
        fontWeight: designSystem.typography.fontWeight.bold,
        padding: designSystem.spacing[4],
        borderRadius: designSystem.borders.radius.md,
        boxShadow: designSystem.shadows.md,
      }}
    >
      My Component
    </div>
  );
}
```

### With Tailwind CSS

The design system is integrated with Tailwind CSS through the `tailwind.config.js` file. This means you can use the design system tokens as Tailwind classes:

```tsx
function MyComponent() {
  return (
    <div className="text-primary-500 text-lg font-bold p-4 rounded-md shadow-md">
      My Component
    </div>
  );
}
```

## Customizing the Design System

To customize the design system, edit the `src/lib/design-system.ts` file:

```typescript
// src/lib/design-system.ts

export const designSystem = {
  colors: {
    primary: {
      // Customize primary colors
      500: '#ff0000', // Change primary-500 to red
    },
    // ...
  },
  // ...
};
```

Then update the `tailwind.config.js` file to use the customized design system:

```javascript
// tailwind.config.js

import { designSystem } from './src/lib/design-system';

/** @type {import('tailwindcss').Config} */
module.exports = {
  // ...
  theme: {
    extend: {
      colors: {
        primary: designSystem.colors.primary,
        // ...
      },
      // ...
    },
  },
  // ...
};
```

## Best Practices

1. **Use design system tokens**
   - Use design system tokens instead of hardcoded values
   - This ensures consistency across the application

2. **Use Tailwind classes**
   - Use Tailwind classes that are mapped to design system tokens
   - This makes it easier to maintain and update the design

3. **Customize the design system**
   - Customize the design system to match your brand
   - Update the `tailwind.config.js` file to use the customized design system

4. **Document design decisions**
   - Document why certain design decisions were made
   - This helps other developers understand the design system

5. **Keep the design system simple**
   - Don't overcomplicate the design system
   - Focus on the most important design tokens

## Related Documentation

- [Styling Guidelines](../guides/styling-guidelines.md) - CSS and styling best practices
- [Component System](../components/component-system.md) - Overview of the component system
