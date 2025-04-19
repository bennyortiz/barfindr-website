# BarFindr - Austin TX Bar Directory

BarFindr is a comprehensive directory of bars in Austin, TX, built with Next.js, TypeScript, and Tailwind CSS. The application helps users discover bars, find happy hours, and explore the Austin bar scene.

![BarFindr Screenshot](https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?q=80&w=2070)

## Features

- **Bar Directory**: Browse and search for bars in Austin
- **Bar Details**: View detailed information about each bar
- **Interactive Map**: Find bars near you with an interactive map
- **Happy Hour Finder**: Discover the best happy hour deals
- **Category Browsing**: Browse bars by features, neighborhoods, price range, and more
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/barfindr.git
cd barfindr
```

2. Install dependencies

```bash
npm install
# or
yarn install
```

3. Run the development server

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application

## Documentation

Comprehensive documentation is available in the `docs` directory:

### Getting Started
- [Project Overview](docs/getting-started/project-overview.md) - Introduction to BarFindr
- [Installation](docs/getting-started/installation.md) - How to set up the project
- [Project Structure](docs/getting-started/project-structure.md) - Overview of the codebase organization

### Architecture
- [Application Architecture](docs/architecture/application-architecture.md) - High-level architecture overview
- [Data Management](docs/architecture/data-management.md) - How data is stored and managed
- [Design Patterns](docs/architecture/design-patterns.md) - Common patterns used in the codebase

### Components
- [Component System](docs/components/component-system.md) - Overview of the component system
- [Layout Components](docs/components/layout-system.md) - Page layouts and structure
- [CSS Utilities](docs/components/css-utilities.md) - Reusable CSS classes and utilities

### Development Guides
- [Adding New Pages](docs/guides/adding-new-pages.md) - How to create new pages
- [Adding New Features](docs/guides/adding-new-features.md) - How to add new features
- [Adding New Bars](docs/guides/adding-new-bars.md) - How to add new bar data
- [Styling Guidelines](docs/guides/styling-guidelines.md) - CSS and styling best practices
- [Contributing](docs/guides/contributing.md) - How to contribute to the project

### Reference
- [Design System](docs/reference/design-system.md) - Design tokens and variables
- [Utilities](docs/reference/utilities.md) - Utility functions and helpers
- [Slug Guidelines](docs/reference/slug-guidelines.md) - Guidelines for creating slugs

## Quick Start

### Adding a New Bar

To add a new bar to the directory, use the provided script:

```bash
node scripts/add-new-bar.js
```

Follow the prompts to enter the bar's information. For more details, see the [Adding New Bars](docs/guides/adding-new-bars.md) guide.

### Creating a New Page

To create a new page, add a new directory or file in the `src/app` directory. For more details, see the [Adding New Pages](docs/guides/adding-new-pages.md) guide.

### Adding a New Feature

To add a new feature, create a new directory in the `src/features` directory. For more details, see the [Adding New Features](docs/guides/adding-new-features.md) guide.

## Technologies

- [Next.js](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Leaflet](https://leafletjs.com/) - Interactive maps
- [Lucide Icons](https://lucide.dev/) - Icon library

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

See the [Contributing Guide](docs/guides/contributing.md) for more details.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [Unsplash](https://unsplash.com/) - Images
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [Vercel](https://vercel.com/) - Deployment platform
