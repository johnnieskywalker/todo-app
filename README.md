# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload when you make changes.

### `npm test`

Launches the test runner in watch mode.\
See [Testing](#-testing) below for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

Ejects the app from Create React App, giving you full control over the configuration.

## 🧪 Testing

### Test Structure

Tests are organized to mirror the `src` directory structure with `__tests__` folders. We use:

- **Jest** as the test runner
- **React Testing Library** for component testing
- **InversifyJS** for dependency injection in tests

### Testing Approach

1. **Unit Tests**: Test individual components and hooks in isolation
2. **Integration Tests**: Test component interactions
3. **Dependency Injection**: Use InversifyJS to mock dependencies

### Running Tests

- Run all tests: `npm test`
- Run tests in watch mode: `npm test -- --watch`
- Generate coverage report: `npm test -- --coverage`

## 📦 Dependencies

- React 18
- TypeScript
- InversifyJS
- Jest
- React Testing Library
- ESLint + Prettier

## 📚 Documentation

- [React Documentation](https://reactjs.org/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [InversifyJS Documentation](https://inversify.io/)
- [Jest Documentation](https://jestjs.io/)

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
