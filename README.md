# 📇 QuickContacts

## Project Overview
**QuickContacts** is a full-stack web application designed for the Bachelor of Science in Information Technology (BSIT) program. It bridges local user management with cloud-based storage, allowing users to securely login via Google OAuth2 and instantly sync their Google Contacts to a modern dashboard.

## Tech Stack
* **Frontend:** React.js, Axios, React Router
* **Backend:** Spring Boot (Java 17/19), Spring Security
* **Database:** Supabase (Cloud PostgreSQL)
* **APIs:** Google OAuth 2.0, Google People API

## Key Features
* **Cloud Database Integration:** Powered by Supabase for reliable, accessible storage.
* **Seamless OAuth2 Login:** One-click authentication using Google accounts.
* **Real-time Contact Sync:** Fetches validated Names & Emails from Google People API.
* **Modern Dashboard:** Clean UI displaying total contact counts and detailed listings.

---

## 🚀 How to Run (Setup/Clone)

### 1. Database Setup (Supabase)
Since we are using Supabase, there is no need to install MySQL locally.
1.  Log in to the [Supabase Dashboard](https://supabase.com/dashboard).
2.  Ensure your project **QuickContacts** is active.
3.  Note your **Project ID** (e.g., `exeydhrvqpqcgbwoawpj`) and your **Database Password**.

### 2. Backend Setup (Spring Boot)
1.  Open the `backend/demo/demo` folder in your IDE.
2.  **Configuration:** Open `src/main/resources/application.properties` and ensure the credentials match your Supabase project:
    ```properties
    spring.datasource.url=jdbc:postgresql://[aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres?prepareThreshold=0](https://aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres?prepareThreshold=0)
    spring.datasource.username=postgres.[YOUR_PROJECT_ID]
    spring.datasource.password=[YOUR_DB_PASSWORD]
    ```
3.  **Build:** Open a terminal in the backend folder and run:
    ```bash
    mvnw.cmd clean install -DskipTests
    ```
4.  **Run:** Start the server:
    ```bash
    mvnw.cmd spring-boot:run
    ```
    *Server starts at: `http://localhost:8080`*

### 3. Frontend Setup (React)
1.  Open a new terminal and navigate to the `web` folder.
2.  **Environment Variables:** Create or update your `.env` file:
    ```env
    REACT_APP_SUPABASE_URL=https://[YOUR_PROJECT_ID].supabase.co
    REACT_APP_SUPABASE_ANON_KEY=[YOUR_ANON_KEY]
    ```
3.  **Install & Start:**
    ```bash
    npm install
    npm start
    ```
    *App opens at: `http://localhost:3000`*

---

## 🛠 Troubleshooting
* **Tenant or User Not Found:** Double-check your `spring.datasource.username`. It must follow the format `postgres.your_project_id`.
* **Build Failures:** Always use the `-DskipTests` flag when building with Maven to prevent connection issues from blocking the build.
* **Java Workspace Errors:** In VS Code, use `Ctrl+Shift+P` -> `Java: Clean Java Language Server Workspace` if red errors persist after a clean build.
* **Redirect URI:** Ensure `http://localhost:8080/login/oauth2/code/google` is whitelisted in your Google Cloud Console.