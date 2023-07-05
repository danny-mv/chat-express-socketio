# 🎲 Realtime Chat API
⚡ Welcome to the Realtime Chat API, a web service designed to support a simple yet engaging chat application. This document will guide you through the application features, API functionalities, and the usage.

### 🎯 Application Features
The Realtime Chat application is built with a real-time communication feature using Socket.IO. It allows users to send and receive messages instantly. The application also supports user authentication and message history.

### 🤖 API Functionalities
In order to use the chat, you must register as a user with a unique email, name, and password. Each user can see a list of all the messages they've sent and received.

The API supports the following operations:

- **User registration:** A user can register with a unique email, name, and password. On creation, a unique identifier and registration date is assigned.

-  **User login:** A user can log in with their registered email and password. On successful login, a JWT token is generated for the user.

- **Send a message:** A registered user can send a message. Each message will be recorded with the sender's name, the message content, and the time it was sent.

- **List messages:** A user can view a list of all the messages they've sent and received, along with the time each message was sent.

- **List users:** The API allows to list all the registered users.

The API follows the main design patterns and respects a clean architecture structure. The persistence is achieved through MongoDB database using Sequelize as an ORM.

### 📑 Available Endpoints
Please refer to the /documentation directory to view the full specification of the available endpoints.


### 📥 Installation for the Backend
To get started with the backend of this application, you first need to navigate to the server directory:

```bash
cd server
```
Then, install the project dependencies:

```bash
npm install
```
### 🏁 How To Start the Backend
To start the server in development mode, run the following script:

```bash
npm run dev
```
Then, open http://localhost:8000 to access the server.

### 🚀 Production for the Backend
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

### 🏗️ Scripts for the Backend
This project comes with several predefined scripts in the package.json file:
<!--
test: Runs tests unit and acceptance tests.

test:unit: Runs tests using jest.

test:features: Runs tests using cucumber and supertest.
-->

`lint:` Runs ESLint to check code quality.

`lint:fix:` Runs ESLint to fix code style issues.

`dev:` Starts the development server with ts-node-dev and allows debugging

`build:` Removes the ./dist folder and compiles the TypeScript code intoJavaScript in the ./dist folder.

`start:` Starts the server in production using the compiled files in the dist/ folder.

### 📥 Installation for the Frontend
To get started with the frontend of this application, you first need to navigate to the client directory:

```bash
cd client
```
Then, install the project dependencies:

```bash
npm install
```
### 🏁 How To Start the Frontend
To start the client in development mode, run the following script:

```bash
npm run dev
```
Then, open http://localhost:3000 to access the client.

### 🚀 Production for the Frontend
To run the client in production mode, first build the Next.js code by running:

```bash
npm run build
```
This will generate the .next directory with the compiled JavaScript files.

Then, start the client by running:

```bash
npm start
```

This will start the client and make it available at http://localhost:3000.

### 🏗️ Scripts for the Frontend
This project comes with several predefined scripts in the package.json file:

`dev:` Starts the development server.

`build:` Builds the application for production.

`start:` Starts the application in production mode.

`lint:` Runs ESLint to check code quality.