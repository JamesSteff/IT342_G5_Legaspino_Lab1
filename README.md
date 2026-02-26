# QuickContacts

### Project Overview
**QuickContacts** is a full-stack web application designed to bridge the gap between local user management and cloud-based contact storage. It allows users to securely register, login via Google OAuth2, and instantly sync their Google Contacts to a streamlined, modern dashboard.

### Tech Stack
* **Frontend:** React.js, Axios, React Router
* **Backend:** Spring Boot (Java 17/21), Spring Security
* **Database:** MySQL
* **APIs:** Google OAuth 2.0, Google People API

### Key Features
* **Seamless OAuth2 Login:** One-click authentication using Google accounts.
* **Real-time Contact Sync:** Fetches validated connections (Names & Emails) from Google People API.
* **Secure Local Auth:** Includes a fallback local registration system with BCrypt password hashing.
* **Modern Dashboard:** A clean UI that displays total contact count and detailed listings.

---

### 🚀 How to Run (New Setup/Clone)

#### 1. Database Setup
* Open MySQL Workbench.
* Execute: `CREATE DATABASE it342_lab2;`

#### 2. Backend Setup (Spring Boot)
1.  Open the `backend/demo/demo` folder in VS Code.
2.  **Configuration:** Open `src/main/resources/application.properties` and provide your credentials:
    ```properties
    spring.security.oauth2.client.registration.google.client-id=YOUR_ACTUAL_GOOGLE_CLIENT_ID
    spring.security.oauth2.client.registration.google.client-secret=YOUR_ACTUAL_GOOGLE_SECRET
    ```
3.  **Build & Dependencies:** Open terminal in the backend folder:
    `mvnw.cmd clean install`
4.  **Run:** Execute `DemoApplication.java` or run `mvnw.cmd spring-boot:run`.
    * *Server starts at:* `http://localhost:8080`

#### 3. Frontend Setup (React)
1.  Open a new terminal and navigate to the `web` folder.
2.  **Install:** Run `npm install` (Must be done for new clones to rebuild node_modules).
3.  **Start:** Run `npm start`.
    * *App opens at:* `http://localhost:3000`

---

### 🛠 Troubleshooting for New Clones
* **Workspace Errors:** If VS Code shows red errors on a new clone, use `Ctrl+Shift+P` -> **Java: Clean Java Language Server Workspace**.
* **Contact Visibility:** If contacts don't appear, ensure they are in the **"My Contacts"** category in Google. Temporary "Other Contacts" must be manually added to the main list to be visible.
* **Redirect URI:** Ensure your Google Cloud Console has `http://localhost:8080/login/oauth2/code/google` whitelisted in the Authorized Redirect URIs.

---
