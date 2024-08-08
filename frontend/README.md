# Frontend-Specific Details (Simple version)

## Table of Contents

- [Features](#features)
- [Commands](#commands)
- [Project Structure](#project-structure)

## Features

- **Reactjs**: [Reactjs](https://react.dev)

## Commands

### Running locally (without Docker):

```bash
yarn start
```

#### Testing:

```bash
# run all tests
yarn test
```

#### Running with Docker:

```bash
# run docker container in development mode
yarn docker:dev

# run all tests in a docker container
yarn docker:test
```

## Project Structure

```
src/
|-- api/            # API interaction files (e.g., API functions)
|-- components/     # React components
|-- App.js          # Main application component
|-- index.js        # Application entry point
|-- __tests__/      # Test files
```