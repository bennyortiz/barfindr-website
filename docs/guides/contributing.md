# Contributing

This guide explains how to contribute to the BarFindr application.

## Getting Started

### Prerequisites

Before you begin, make sure you have the following installed:

- **Node.js**: Version 18.x or later
- **npm** or **yarn**: For package management
- **Git**: For version control

### Setting Up the Development Environment

1. Fork the repository on GitHub
2. Clone your fork locally:

```bash
git clone https://github.com/yourusername/barfindr.git
cd barfindr
```

3. Install dependencies:

```bash
# Using npm
npm install

# Using yarn
yarn install
```

4. Create a branch for your changes:

```bash
git checkout -b feature/your-feature-name
```

5. Start the development server:

```bash
# Using npm
npm run dev

# Using yarn
yarn dev
```

## Development Workflow

### Making Changes

1. Make your changes to the codebase
2. Test your changes locally
3. Commit your changes with a descriptive commit message:

```bash
git add .
git commit -m "Add feature: your feature description"
```

4. Push your changes to your fork:

```bash
git push origin feature/your-feature-name
```

5. Create a pull request on GitHub

### Pull Request Guidelines

When creating a pull request, please follow these guidelines:

1. **Title**: Use a clear and descriptive title
2. **Description**: Explain what your changes do and why they are needed
3. **Screenshots**: Include screenshots if your changes affect the UI
4. **Tests**: Include tests for your changes if applicable
5. **Documentation**: Update documentation if needed

### Code Style

BarFindr follows a consistent code style. Please make sure your code follows these guidelines:

1. **TypeScript**: Use TypeScript for all new code
2. **Formatting**: Use Prettier for code formatting
3. **Linting**: Use ESLint for code linting
4. **Naming**: Follow the naming conventions in the codebase
5. **Comments**: Add comments for complex code

You can check your code style with:

```bash
# Using npm
npm run lint

# Using yarn
yarn lint
```

And format your code with:

```bash
# Using npm
npm run format

# Using yarn
yarn format
```

## Adding Features

### Adding New Pages

See the [Adding New Pages](./adding-new-pages.md) guide for instructions on how to add new pages to the application.

### Adding New Features

See the [Adding New Features](./adding-new-features.md) guide for instructions on how to add new features to the application.

### Adding New Bars

See the [Adding New Bars](./adding-new-bars.md) guide for instructions on how to add new bars to the application.

## Testing

### Running Tests

You can run the tests with:

```bash
# Using npm
npm run test

# Using yarn
yarn test
```

### Writing Tests

When writing tests, please follow these guidelines:

1. **Test Coverage**: Aim for high test coverage
2. **Test Types**: Write unit tests, integration tests, and end-to-end tests as appropriate
3. **Test Organization**: Organize tests in a way that mirrors the codebase
4. **Test Naming**: Use descriptive test names
5. **Test Isolation**: Make sure tests are isolated from each other

## Documentation

### Updating Documentation

When making changes to the codebase, please update the documentation as needed:

1. **Code Comments**: Add comments to explain complex code
2. **JSDoc**: Add JSDoc comments to functions and components
3. **README**: Update the README if needed
4. **Documentation Files**: Update documentation files in the `docs` directory

### Documentation Style

When writing documentation, please follow these guidelines:

1. **Clarity**: Write clear and concise documentation
2. **Examples**: Include examples where appropriate
3. **Formatting**: Use Markdown formatting consistently
4. **Links**: Add links to related documentation
5. **Images**: Include images where they help explain concepts

## Submitting Changes

### Pull Request Process

1. Create a branch for your changes
2. Make your changes
3. Test your changes
4. Commit your changes
5. Push your changes to your fork
6. Create a pull request on GitHub
7. Wait for review and address any feedback
8. Once approved, your changes will be merged

### Review Process

All pull requests will be reviewed by a maintainer. The review process includes:

1. **Code Review**: The code will be reviewed for quality, style, and correctness
2. **Testing**: The changes will be tested to ensure they work as expected
3. **Documentation**: The documentation will be reviewed for completeness and clarity
4. **Feedback**: Feedback will be provided on the pull request
5. **Approval**: Once all feedback has been addressed, the pull request will be approved and merged

## Community Guidelines

### Code of Conduct

Please follow the [Code of Conduct](./CODE_OF_CONDUCT.md) when participating in the BarFindr community.

### Communication

- **GitHub Issues**: Use GitHub Issues for bug reports and feature requests
- **Pull Requests**: Use Pull Requests for code contributions
- **Discussions**: Use GitHub Discussions for general questions and discussions

### Recognition

All contributors will be recognized in the [Contributors](./CONTRIBUTORS.md) file.

## Related Documentation

- [Project Overview](../getting-started/project-overview.md) - Introduction to BarFindr
- [Project Structure](../getting-started/project-structure.md) - Overview of the codebase organization
- [Adding New Pages](./adding-new-pages.md) - How to create new pages
- [Adding New Features](./adding-new-features.md) - How to add new features
- [Adding New Bars](./adding-new-bars.md) - How to add new bar data
