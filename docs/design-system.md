# BarFindr Design System

This document outlines the design system used in the BarFindr project, providing guidelines for consistent styling and component usage.

## Design Principles

- **Clean and Modern**: Use ample whitespace, clear typography, and subtle animations
- **Mobile-First**: Design for mobile devices first, then enhance for larger screens
- **Consistent**: Maintain consistent spacing, typography, and color usage
- **Accessible**: Ensure all components meet WCAG 2.1 AA standards

## Color Palette

BarFindr uses a dark theme with pink accent colors:

- **Background**: Dark mode background (`oklch(0.145 0 0)`)
- **Foreground**: Light text on dark background (`oklch(0.985 0 0)`)
- **Primary**: Pink accent color (`oklch(0.7 0.25 330)`)
- **Secondary**: Slightly lighter background (`oklch(0.269 0 0)`)
- **Muted**: Subdued background for less emphasis (`oklch(0.269 0 0)`)
- **Accent**: Brighter pink for highlights (`oklch(0.65 0.28 330)`)

## Typography

- **Font Family**: Geist Sans for body text, Geist Mono for code
- **Headings**: Use letter-spacing of `-0.025em` for most headings, `-0.03em` for h1
- **Body Text**: Line height of 1.6 for optimal readability
- **Font Smoothing**: Enhanced with antialiased rendering

## Spacing

Follow the Tailwind CSS spacing scale:

- `4`: 1rem (16px) - Standard spacing
- `6`: 1.5rem (24px) - Medium spacing
- `8`: 2rem (32px) - Large spacing
- `12`: 3rem (48px) - Extra large spacing

## Interactive Elements

### Cards

Use the `.card-hover` utility for cards that should have hover effects:

```jsx
<div className="card-hover rounded-lg bg-card p-4">
  Card content
</div>
```

### Buttons

Use the `.button-press` utility for buttons with press effects:

```jsx
<button className="button-press bg-primary text-white px-4 py-2 rounded-md">
  Click me
</button>
```

### Images

Use the `.image-zoom` utility for images that should zoom on hover:

```jsx
<div className="image-zoom rounded-lg overflow-hidden">
  <Image src="/image.jpg" alt="Description" width={300} height={200} />
</div>
```

### Links

Use the `.link-underline` utility for links with animated underlines:

```jsx
<a href="#" className="link-underline text-primary">
  Learn more
</a>
```

## Glassmorphism

Use the `.glass` and `.glass-dark` utilities for frosted glass effects:

```jsx
<div className="glass dark:glass-dark p-4 rounded-lg">
  Content with backdrop blur
</div>
```

## Shadows

Three levels of shadows are available:

- `shadow-apple-sm`: Subtle shadow for small elements
- `shadow-apple-md`: Medium shadow for cards and containers
- `shadow-apple-lg`: Larger shadow for elevated elements

## Focus Styles

Use the `.focus-ring` and `.focus-ring-inset` utilities for accessible focus styles:

```jsx
<button className="focus-ring bg-primary text-white px-4 py-2 rounded-md">
  Focused button
</button>
```

## Best Practices

1. **Use Tailwind Utilities**: Prefer Tailwind's utility classes over custom CSS
2. **Component Abstraction**: Create reusable components for common UI patterns
3. **Responsive Design**: Use Tailwind's responsive prefixes (`sm:`, `md:`, `lg:`, etc.)
4. **Dark Mode**: Support dark mode with the `dark:` variant
5. **Accessibility**: Ensure sufficient color contrast and keyboard navigation

## Adding New Components

When adding new components:

1. Use existing design tokens and utilities
2. Document the component in this guide
3. Create a story in Storybook (if applicable)
4. Ensure the component is responsive and accessible
