# BarFindr Architecture

This document provides an overview of the BarFindr application architecture, explaining the key components, data flow, and design decisions.

## Application Structure

BarFindr follows a component-based architecture using Next.js and React. The application is organized into the following main sections:

### Pages

The application uses Next.js App Router for routing, with pages defined in the `src/app` directory:

- **Home Page** (`/`): Landing page with featured bars and quick access to main features
- **Bars Page** (`/bars`): Directory of all bars with filtering and sorting
- **Bar Detail Page** (`/bars/[id]`): Detailed information about a specific bar
- **Map Page** (`/map`): Interactive map showing all bars
- **Happy Hours Page** (`/happy-hours`): Page focused on bars with happy hour specials

### Components

Components are organized by feature/purpose:

- **Bar Components** (`src/components/bars/`): Components for displaying and interacting with bar data
- **Layout Components** (`src/components/layout/`): Page layout, navigation, and structural components
- **Map Components** (`src/components/map/`): Components for the interactive map functionality
- **UI Components** (`src/components/ui/`): Reusable UI elements like buttons, cards, and inputs

### Data Management

Bar data is stored in individual JSON files in the `src/data/bars/` directory. This approach provides several benefits:

1. **Maintainability**: Each bar is in its own file, making it easy to update or remove
2. **Organization**: Clear structure for adding new bars
3. **Scalability**: Can handle many bars without a single file becoming unwieldy
4. **Future-proofing**: Easy to migrate to a database or API in the future

The data is loaded and processed through utility functions and custom hooks:

- **Data Loading**: `src/lib/bar-data-loader.ts` handles loading bar data
- **Data Processing**: `src/utils/bar-utils.ts` provides utilities for working with bar data
- **Data Hooks**: `src/hooks/useBarData.ts` offers a React hook for filtering and sorting bars

## Key Design Patterns

### Component Composition

Components are designed to be composable, with smaller components combined to create more complex UIs. For example:

- `BarCard` is used in lists and grids
- `Map` components are composed of several smaller specialized components
- Layout components like `PageLayout` provide consistent structure

### Container/Presentation Pattern

Many components follow the container/presentation pattern:

- **Container Components**: Handle data fetching, state, and logic
- **Presentation Components**: Focus on rendering UI based on props

For example, the `BarFilter` component handles filter state and logic, while UI components like `Badge` and `Button` are purely presentational.

### Custom Hooks

Custom hooks encapsulate and reuse stateful logic:

- `useBarData`: Manages bar filtering, sorting, and search functionality
- `useMap`: Handles map-related state and interactions

### Server-Side vs. Client-Side Rendering

The application uses a mix of server-side and client-side rendering:

- **Server-Side Rendering**: Used for initial page loads and SEO-critical content
- **Client-Side Rendering**: Used for interactive elements like maps and filters

Components that require browser APIs (like the map) use dynamic imports with `{ ssr: false }` to ensure they only render on the client.

## Data Flow

1. **Data Source**: Bar data is stored in JSON files in `src/data/bars/`
2. **Data Loading**: The data is imported and processed in `src/lib/data.ts`
3. **Component Access**: Components access the data through imports or props
4. **User Interaction**: User actions (like filtering) update component state
5. **UI Updates**: The UI re-renders to reflect the updated state

## Future Considerations

The architecture is designed to be extensible for future features:

1. **API Integration**: The data loading mechanism can be replaced with API calls
2. **Database Migration**: The JSON file structure mirrors a database schema for easy migration
3. **Authentication**: The layout includes placeholders for user authentication
4. **Personalization**: The data structure supports adding user-specific features like favorites

## Performance Optimizations

Several optimizations are implemented:

1. **Component Memoization**: Key components use `React.memo` to prevent unnecessary re-renders
2. **Lazy Loading**: Map components are dynamically imported to reduce initial bundle size
3. **Image Optimization**: Images use appropriate sizing and lazy loading
4. **State Management**: Local component state is used for UI state, avoiding unnecessary global state
