# IT342 Lab 2: User Registration and Authentication System (Spring Boot + React)

## Project Overview
This project is a full-stack web application that features a secure user authentication system. It allows users to register an account, log in, and access a protected dashboard.

## Tech Stack
* **Frontend**: React.js with Axios and React Router
* **Backend**: Spring Boot (Java 21)
* **Database**: MySQL
* **Security**: BCrypt password hashing

## Features
* **User Registration**: Saves user data securely in the MySQL database.
* **User Login**: Verifies credentials against the stored records.
* **Protected Routes**: Restricts access to the Dashboard unless the user is authenticated.
* **Persistent Sessions**: Uses LocalStorage to manage user tokens.

## How to Run the Project

### 1. Database Setup
1. Open MySQL Workbench.
2. Run the script to create the database: `CREATE DATABASE it342_lab2;`.

### 2. Backend Setup (Spring Boot)
1. Open the `backend` folder in VS Code.
2. Ensure `application.properties` has the correct MySQL credentials.
3. Run `DemoApplication.java`. The server will start on `http://localhost:8080`.

### 3. Frontend Setup (React)
1. Open a new terminal and navigate to the `web` folder.
2. Run `npm install` to install dependencies.
3. Run `npm start`. The app will open at `http://localhost:3000`.

## Documentation
The detailed Functional Requirements Specification (FRS) and task checklist can be found in the `/docs` and `TASK_CHECKLIST.md` files.
