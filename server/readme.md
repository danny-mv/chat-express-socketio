# 🎲 Dice Game API

⚡ Welcome to the Dice Game API, a web service designed to support a simple yet fun dice game. This document will guide you through the game rules, API functionalities, and the usage.
### 🎯 Game Rules

The Dice Game is played with two six-sided dice. The outcome of each game is determined by the roll of these dice:

If the result of the two dice is 7, the game is won.
Otherwise, the game is lost.

### 🤖 API Functionalities

In order to play the game, you must register as a player with a unique name. Each player can see a list of all the games they've played and their win rate.

The API supports the following operations:

- **Player registration:** A player can register with a unique name. On creation, a unique identifier and registration date is assigned. If a player does not want to add a name, they will be designated "ANONYMOUS". There can be more than one "ANONYMOUS" player.

- **Play a game:** A registered player can play a game. Each game will be recorded with the result of the dice roll and whether the game was won or not.

- **List games:** A player can view a list of all the games they've played, the values of each dice roll and whether they won or not. Additionally, they can see their win rate.

- **Delete games:** A player cannot delete a specific game, but they can delete all of their games.

- **List players:** The API allows to list all the registered players, their win rate, and the average win rate of all players.

The API follows the main design patterns and respects a clean architecture structure. The persistence is achieved through MySQL database using Sequelize as an ORM.

### 📑 Available Endpoints

Please refer to the /documentation directory to view the full specification of the available endpoints.

### 📋 GitHub Actions Workflow:

[![🏠 Build](https://github.com/xpan1c/sprint-4-2-node-rest-db-jwt/actions/workflows/build.yml/badge.svg?branch=main)](https://github.com/xpan1c/sprint-4-2-node-rest-db-jwt/actions/workflows/build.yml)

This GitHub Actions workflow automatically builds and tests the application when code changes are pushed to the master branch or a pull request targeting the main branch is opened or synchronized.

### 📥 Installation

To get started with this template, you first need to clone the repository:

```bash
git clone https://github.com/xpan1c/sprint-4-2-node-rest-db-jwt.git
```

Then, install the project dependencies:

```bash
npm install
```

### 🏁 How To Start

To start the server in development mode, run the following script:
```bash
npm run dev
```
Then, open http://localhost:8000 to access the server.


### 🚀 Production

To run the server in production mode, first build the TypeScript code into JavaScript by running:

```bash
npm run build
```

This will generate the dist directory with the compiled JavaScript files.

Then, start the server by running:

```bash
npm start
```

This will start the server and make it available at http://localhost:8000.


### 🏗️ Scripts
This project comes with several predefined scripts in the package.json file:

```test```: Runs tests unit and acceptance tests.

```test:unit```: Runs tests using jest.

```test:features```: Runs tests using cucumber and supertest.

```lint```: Runs ESLint to check code quality.

```lint:fix```: Runs ESLint to fix code style issues.

```dev```: Starts the development server with ts-node-dev and allows debugging

```build```: Removes the ./dist folder and compiles the TypeScript code into JavaScript in the ./dist folder.

```start```: Starts the server in production using the compiled files in the dist/ folder.

<!--
### 📝 Dependencies

- cors: middleware for handling Cross-Origin Resource Sharing (CORS)

- dotenv: loads environment variables from a .env file

- express: web framework for Node.js

- express-promise-router: promise-based router for Express

- helmet: middleware for adding security headers

- mongodb: driver for MongoDB

- mysql2: MySQL client for Node.js

### 🛠️ Dev Dependencies

- @types/cors: TypeScript definitions for cors

- @types/express: TypeScript definitions for express

- @types/jest: TypeScript definitions for jest

- @types/mysql: TypeScript definitions for mysql

- eslint: linter for TypeScript

- eslint-config-codely: ESLint configuration used by CodelyTV

- mysql: MySQL driver for Node.js

- rimraf: cross-platform tool for removing files and directories

- ts-jest: TypeScript preprocessor for Jest

- ts-node-dev: TypeScript execution and development environment for Node.js

- tsc-watch: TypeScript compiler with file watching

### 🗂️ Folder structure

In this folder structure, the code is organized according to the principles of Hexagonal Architecture. 

```
src/
├── backend
│   ├── middlewares
│   ├── App.ts
│   ├── server.start.ts
│   └── Server.ts
├── shared
│   ├── utils
│   ├── domain
│   └── infrastructure
│       ├── config
│       └── persistence
└── user
    ├── application
    │   ├── services
    │   └── use-cases
    ├── domain
    │   ├── entities
    │   └── repositories
    └── infrastructure
        ├── controllers
        ├── repositories
        ├── routes
        ├── services
        └── UserModule.ts
```
-->



