/**
 * Script to organize the BarFindr codebase
 * 
 * This script will:
 * 1. Create a new directory structure
 * 2. Document the organization plan
 */

const fs = require('fs');
const path = require('path');

// Create the organization plan document
const organizationPlan = `# BarFindr Codebase Organization Plan

## Directory Structure

\`\`\`
barfindr/
├── public/               # Static assets
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── bars/         # Bar listing and detail pages
│   │   ├── happy-hours/  # Happy hour pages
│   │   └── ...
│   ├── core/             # Core application components and utilities
│   │   ├── components/   # Shared components
│   │   │   ├── layout/   # Layout components
│   │   │   └── ui/       # UI components
│   │   ├── hooks/        # Shared hooks
│   │   └── utils/        # Shared utilities
│   ├── features/         # Feature-specific code
│   │   ├── bars/         # Bar-related features
│   │   │   ├── components/ # Bar-specific components
│   │   │   ├── hooks/    # Bar-specific hooks
│   │   │   └── utils/    # Bar-specific utilities
│   │   ├── maps/         # Map-related features
│   │   └── happy-hours/  # Happy hour features
│   ├── lib/              # Library code and configurations
│   │   ├── design-system.ts # Design system configuration
│   │   └── ...
│   ├── styles/           # Global styles
│   └── types/            # TypeScript type definitions
└── ...
\`\`\`

## Naming Conventions

- **Components**: Use PascalCase for component files (e.g., \`BarCard.tsx\`)
- **Utilities**: Use kebab-case for utility files (e.g., \`date-utils.ts\`)
- **Hooks**: Use camelCase with 'use' prefix (e.g., \`useBarData.ts\`)
- **Types**: Use PascalCase for type definitions (e.g., \`Bar.ts\`)

## Import Patterns

- Use absolute imports with aliases:
  - \`@/core\` for core components and utilities
  - \`@/features\` for feature-specific code
  - \`@/lib\` for library code
  - \`@/styles\` for styles
  - \`@/types\` for type definitions

## Component Organization

### Core Components

Core components are shared across the application and should be placed in \`src/core/components\`.

- **Layout Components**: Components that define the structure of pages (e.g., \`PageLayout\`, \`Navbar\`)
- **UI Components**: Reusable UI elements (e.g., \`Button\`, \`Card\`)

### Feature Components

Feature components are specific to a particular feature and should be placed in \`src/features/{feature}/components\`.

- **Bar Components**: Components related to bars (e.g., \`BarCard\`, \`BarDetailTabs\`)
- **Map Components**: Components related to maps (e.g., \`Map\`, \`MapMarker\`)
- **Happy Hour Components**: Components related to happy hours (e.g., \`HappyHourCard\`)

## Implementation Steps

1. Create the new directory structure
2. Move components to their appropriate directories
3. Update imports to use the new structure
4. Create index files for exports
5. Update documentation

## Benefits

- **Improved organization**: Code is organized by feature and responsibility
- **Better maintainability**: Related code is grouped together
- **Easier navigation**: Clear directory structure makes it easier to find code
- **Scalability**: Structure can accommodate new features without becoming unwieldy
`;

// Write the organization plan to a file
fs.writeFileSync(path.join(__dirname, '..', 'ORGANIZATION_PLAN.md'), organizationPlan);

console.log('Organization plan created at ORGANIZATION_PLAN.md');
