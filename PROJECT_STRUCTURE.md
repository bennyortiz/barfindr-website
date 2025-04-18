# BarFindr Project Structure

This document outlines the organization and architecture of the BarFindr project to help both developers and AI assistants understand how the codebase is structured.

## Directory Structure

```
barfindr/
├── public/               # Static assets
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── bars/         # Bar listing and detail pages
│   │   ├── happy-hours/  # Happy hour pages
│   │   └── ...
│   ├── components/       # React components
│   │   ├── bars/         # Bar-specific components
│   │   ├── layout/       # Layout components
│   │   ├── map/          # Map-related components
│   │   ├── templates/    # Page templates
│   │   └── ui/           # UI components
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility libraries and configurations
│   │   ├── design-system.ts  # Design system configuration
│   │   ├── component-docs.ts # Component documentation
│   │   └── ...
│   ├── types/            # TypeScript type definitions
│   └── utils/            # Utility functions
└── ...
```

## Architectural Patterns

### Component Hierarchy

1. **Templates**: High-level page layouts (e.g., `StandardPage`, `DetailPage`)
2. **Layout Components**: Structural components (e.g., `PageLayout`, `Container`)
3. **Feature Components**: Domain-specific components (e.g., `BarCard`, `BarDetailTabs`)
4. **UI Components**: Reusable UI elements (e.g., `Button`, `Card`)

### Design System

The design system is defined in `src/lib/design-system.ts` and provides consistent tokens for:

- Layout constraints (max widths, padding, etc.)
- Spacing scales
- Breakpoints
- Component-specific guidelines

### Data Flow

1. **Data Sources**: Bar data is currently stored in `src/lib/data.ts`
2. **Data Hooks**: Custom hooks like `useBarData` provide access to data
3. **Components**: Consume data from hooks and render UI

## Naming Conventions

- **Files**: Use PascalCase for components, camelCase for utilities
- **Components**: Use PascalCase (e.g., `BarCard`)
- **Hooks**: Use camelCase with `use` prefix (e.g., `useBarData`)
- **Utilities**: Use camelCase (e.g., `formatDate`)

## Component Documentation

Components should be documented with JSDoc comments that include:

- Description of the component's purpose
- Props documentation
- Usage examples

See `src/lib/component-docs.ts` for the documentation structure.

## Adding New Features

When adding new features:

1. **Check for existing components**: Reuse existing components when possible
2. **Follow the design system**: Use design tokens from the design system
3. **Use templates**: Use page templates for consistent layouts
4. **Document components**: Add JSDoc comments to document your components
5. **Add to component docs**: Update component documentation for AI assistance

## Best Practices

1. **Consistent Layout**: Use `Container`, `PageLayout`, and templates for consistent layout
2. **Responsive Design**: Use the breakpoint system for responsive designs
3. **Component Composition**: Compose complex UIs from smaller components
4. **Prop Typing**: Always define prop types for components
5. **Documentation**: Document components with JSDoc comments

## Working with AI

When working with AI assistants:

1. **Reference the design system**: Point AI to the design system for styling decisions
2. **Use templates**: Ask AI to use existing templates for new pages
3. **Follow patterns**: Ask AI to follow established patterns in the codebase
4. **Request documentation**: Ask AI to document new components it creates
