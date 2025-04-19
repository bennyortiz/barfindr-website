# Installation

This guide will help you set up the BarFindr application for local development.

## Prerequisites

Before you begin, make sure you have the following installed:

- **Node.js**: Version 18.x or later
- **npm** or **yarn**: For package management
- **Git**: For version control

## Clone the Repository

First, clone the repository to your local machine:

```bash
git clone https://github.com/yourusername/barfindr.git
cd barfindr
```

## Install Dependencies

Install the project dependencies:

```bash
# Using npm
npm install

# Using yarn
yarn install
```

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```
# Example environment variables
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token_here
```

## Run the Development Server

Start the development server:

```bash
# Using npm
npm run dev

# Using yarn
yarn dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Build for Production

To build the application for production:

```bash
# Using npm
npm run build

# Using yarn
yarn build
```

## Run Production Build

To run the production build locally:

```bash
# Using npm
npm start

# Using yarn
yarn start
```

## Scripts

The following scripts are available:

- `dev`: Start the development server
- `build`: Build the application for production
- `start`: Start the production server
- `lint`: Run ESLint to check for code quality issues
- `format`: Run Prettier to format code
- `test`: Run tests
- `add-bar`: Run the script to add a new bar to the directory

## Troubleshooting

### Common Issues

#### Node.js Version

If you encounter issues with Node.js versions, make sure you're using Node.js 18.x or later. You can check your Node.js version with:

```bash
node --version
```

#### Port Already in Use

If port 3000 is already in use, you can specify a different port:

```bash
# Using npm
npm run dev -- -p 3001

# Using yarn
yarn dev -p 3001
```

#### Missing Dependencies

If you encounter errors about missing dependencies, try removing the `node_modules` directory and reinstalling:

```bash
rm -rf node_modules
npm install
```

### Getting Help

If you encounter any issues that aren't covered here, please check the [Next.js documentation](https://nextjs.org/docs) or open an issue in the repository.

## Next Steps

Now that you have the application running locally, you can:

- Explore the [Project Structure](./project-structure.md) to understand the codebase
- Learn about the [Component System](../components/component-system.md) to understand how the UI is built
- Check out the [Adding New Features](../guides/adding-new-features.md) guide to start contributing
