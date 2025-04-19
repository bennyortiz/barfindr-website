# Layout System

This document provides a comprehensive guide to the layout system used in the BarFindr application. Understanding this system will help you maintain consistency across pages and make it easier to create new pages.

## Layout Hierarchy

The layout system follows a hierarchical structure:

1. **Root Layout** (`src/app/layout.tsx`)
   - Sets up the basic HTML structure, fonts, and global styles
   - Includes the Toaster component for notifications

2. **Page Layout** (`src/core/components/layout/PageLayout.tsx`)
   - Base layout component that includes:
     - Navbar
     - Main content area with optional container
     - Footer
   - Used directly or as a base for more specialized layouts

3. **Specialized Layouts**
   - **StandardPage** (`src/core/components/layout/StandardPage.tsx`)
     - For standard content pages with optional title and description
   - **DetailPage** (`src/core/components/layout/DetailPage.tsx`)
     - For entity detail pages with a hero section

## Core Layout Components

### PageLayout

The base layout component that provides the overall page structure.

```tsx
import { PageLayout } from "@/core/components/layout/PageLayout";

export default function MyPage() {
  return (
    <PageLayout>
      {/* Page content */}
    </PageLayout>
  );
}
```

**Props:**
- `children`: Page content
- `className`: Optional className for the main element
- `containerClassName`: Optional className for the container
- `fullWidth`: Whether to use full width layout without container (default: false)
- `noPadding`: Whether to remove padding from the container (default: false)

### StandardPage

A layout for standard content pages with an optional title and description.

```tsx
import { StandardPage } from "@/core/components/layout/StandardPage";

export default function MyPage() {
  return (
    <StandardPage
      title="Page Title"
      description="Page description text"
    >
      {/* Page content */}
    </StandardPage>
  );
}
```

**Props:**
- `children`: Page content
- `title`: Optional title for the page
- `description`: Optional description for the page
- `className`: Optional className for the main content area
- `narrow`: Whether to use a narrower content width (default: false)
- `noPadding`: Whether to remove default padding (default: false)

### DetailPage

A layout for entity detail pages with a hero section.

```tsx
import { DetailPage } from "@/core/components/layout/DetailPage";
import { Hero } from "@/core/components/ui/hero";

export default function MyEntityPage() {
  return (
    <DetailPage
      hero={
        <Hero
          title="Entity Title"
          image="/path/to/image.jpg"
          badges={["Tag 1", "Tag 2"]}
        />
      }
    >
      {/* Page content */}
    </DetailPage>
  );
}
```

**Props:**
- `children`: Page content
- `hero`: Hero section content (typically an image with overlay and title)
- `className`: Optional className for the content area
- `heroClassName`: Optional className for the hero section
- `narrow`: Whether to use a narrower content width (default: false)

## Supporting Components

### Container

A utility component that provides consistent max-width and padding.

```tsx
import { Container } from "@/core/components/ui/container";

export default function MyComponent() {
  return (
    <Container>
      {/* Content with consistent width and padding */}
    </Container>
  );
}
```

**Props:**
- `children`: Container content
- `className`: Additional CSS classes
- `maxWidth`: Whether to use the max width constraint (default: true)
- `padding`: Whether to add horizontal padding (default: true)
- `center`: Whether to center the container (default: true)
- `content`: Whether to use a content max-width that's narrower than the full container (default: false)
- `as`: The HTML element to render (default: 'div')

### Navbar

The application's navigation bar.

```tsx
import { Navbar } from "@/core/components/layout/Navbar";

// Typically used within layout components, not directly
```

### Footer

The application's footer.

```tsx
import { Footer } from "@/core/components/layout/Footer";

// Typically used within layout components, not directly
```

## Best Practices

1. **Use the appropriate layout component for your page type:**
   - Use `StandardPage` for most content pages
   - Use `DetailPage` for entity detail pages (bars, restaurants, etc.)
   - Use `PageLayout` directly only when you need more customization

2. **Maintain consistent spacing:**
   - Let the layout components handle the main spacing
   - Use the design system's spacing values for internal elements

3. **Responsive design:**
   - All layout components are responsive by default
   - Use the responsive variants in Tailwind classes (sm:, md:, lg:, etc.)

4. **Extending layouts:**
   - If you need a new specialized layout, extend from `PageLayout`
   - Document the new layout component thoroughly

## Design System Integration

The layout system is integrated with the design system defined in `src/lib/design-system.ts`. This ensures consistent spacing, widths, and other visual properties across the application.

Key design system values used in layouts:
- `layout.maxWidth`: Maximum width for containers
- `layout.contentMaxWidth`: Narrower width for content-focused containers
- `layout.padding`: Responsive padding values
- `breakpoints`: Responsive breakpoints

## Related Documentation

- [Component System](./component-system.md) - Overview of the component system
- [Adding New Pages](../guides/adding-new-pages.md) - How to create new pages
- [Design System](../reference/design-system.md) - Design tokens and variables
