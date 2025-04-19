# Project Structure

This document provides a comprehensive guide to the project structure of the BarFindr application. Understanding this structure will help you navigate the codebase and make it easier to add new features.

## Directory Structure

```
barfindr/
├── docs/                 # Documentation
│   ├── getting-started/  # Getting started guides
│   ├── architecture/     # Architecture documentation
│   ├── components/       # Component documentation
│   ├── guides/           # Development guides
│   └── reference/        # Reference documentation
├── public/               # Static assets
│   ├── marker-icon.png   # Map marker icon
│   └── ...
├── scripts/              # Utility scripts
│   ├── add-new-bar.js    # Script to add a new bar
│   └── ...
├── src/                  # Source code
│   ├── app/              # Next.js App Router pages
│   │   ├── bars/         # Bar listing and detail pages
│   │   ├── categories/   # Category pages
│   │   ├── components/   # Component showcase page
│   │   ├── enhanced/     # Enhanced UI showcase
│   │   ├── happy-hours/  # Happy hour pages
│   │   ├── map/          # Map page
│   │   ├── globals.css   # Global styles
│   │   └── layout.tsx    # Root layout
│   ├── core/             # Core application code
│   │   ├── components/   # Core components
│   │   │   ├── layout/   # Layout components
│   │   │   └── ui/       # UI components
│   │   └── utils/        # Core utilities
│   ├── data/             # Data files
│   │   └── bars/         # Bar data JSON files
│   ├── features/         # Feature modules
│   │   ├── bars/         # Bar-related features
│   │   │   ├── components/ # Bar components
│   │   │   ├── hooks/    # Bar-related hooks
│   │   │   └── utils/    # Bar-related utilities
│   │   └── maps/         # Map-related features
│   │       └── components/ # Map components
│   ├── lib/              # Library code
│   │   ├── bar-data.ts   # Bar data loading utilities
│   │   ├── design-system.ts # Design system configuration
│   │   ├── types.ts      # TypeScript type definitions
│   │   └── utils.ts      # General utilities
│   └── styles/           # Additional styles
│       └── leaflet-fixes.css # CSS fixes for Leaflet
└── ...
```

## Key Directories and Files

### `/docs`

Documentation files for the project. These files provide detailed information about the architecture, components, and other aspects of the application.

### `/public`

Static assets that are served directly by the web server. This includes images, icons, and other files that need to be publicly accessible.

### `/scripts`

Utility scripts for various tasks, such as adding new bars, managing data, etc. These scripts are not part of the application itself but are used for development and maintenance.

### `/src/app`

Next.js App Router pages. Each subdirectory corresponds to a route in the application. The structure follows the Next.js App Router conventions.

### `/src/core`

Core application code that is not specific to any particular feature. This includes:

- **`/src/core/components/layout`**: Layout components used across the application
- **`/src/core/components/ui`**: Reusable UI components
- **`/src/core/utils`**: Core utility functions

### `/src/data`

Data files used by the application. For BarFindr, this primarily includes JSON files for bar data.

### `/src/features`

Feature modules, organized by domain. Each feature module contains components, hooks, and utilities specific to that feature.

### `/src/lib`

Library code that provides utilities and configurations for the application. This includes:

- **`bar-data.ts`**: Utilities for loading and processing bar data
- **`design-system.ts`**: Configuration for the design system
- **`types.ts`**: TypeScript type definitions
- **`utils.ts`**: General utility functions

### `/src/styles`

Additional styles that are not included in the global CSS file.

## Code Organization Principles

### Feature-Based Organization

The codebase is organized around features, with each feature having its own directory containing components, hooks, and utilities specific to that feature. This makes it easier to understand and maintain the code for each feature.

### Core vs. Feature Code

Code is divided into "core" and "feature" categories:

- **Core code** is used across multiple features and provides the foundation for the application
- **Feature code** is specific to a particular feature and is only used within that feature

### Component Hierarchy

Components follow a hierarchical structure:

1. **Layout Components**: Define the overall structure of pages
2. **Feature Components**: Implement specific features
3. **UI Components**: Provide reusable UI elements

### Data Management

Bar data is stored in individual JSON files in the `/src/data/bars` directory. This approach provides several benefits:

- Easy to add, update, or remove bars
- Clear separation of data and code
- Simplified data management with utility scripts

## Best Practices

1. **Follow the established directory structure**
   - Place new code in the appropriate directories
   - Maintain the separation between core and feature code

2. **Use the component system**
   - Follow the component hierarchy
   - Use existing components when possible
   - Create new components when needed

3. **Maintain documentation**
   - Update documentation when adding new features
   - Document complex code with comments

4. **Use TypeScript**
   - Define types for all data structures
   - Use TypeScript features to ensure type safety

5. **Follow naming conventions**
   - Use PascalCase for components and types
   - Use camelCase for variables, functions, and properties
   - Use kebab-case for file names

## Configuration Files

### `next.config.js`

Configuration for Next.js, including:
- Output configuration
- Image domains
- Redirects for backward compatibility

### `tailwind.config.js`

Configuration for Tailwind CSS, including:
- Theme customization
- Plugin configuration
- Extended color palette

### `components.json`

Configuration for the component system, including:
- Path aliases
- Style configuration
- Icon library

## Further Reading

- [Application Architecture](../architecture/application-architecture.md)
- [Component System](../components/component-system.md)
- [Adding New Features](../guides/adding-new-features.md)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
