# DevTrack

A full-stack MERN developer productivity tracker for managing coding problems, projects, and development progress in one place.

## 🚀 Live Demo

**Frontend:** https://dev-track-indol.vercel.app/

**Backend API:** https://devtrack-api-zen4.onrender.com/

## ✨ Features

* User registration and login
* JWT-based authentication using HTTP-only cookies
* Secure password hashing with bcrypt
* Create, update, and delete coding problems
* Track problem-solving progress
* Create, update, and delete projects
* Dashboard with progress statistics
* User-specific data protection
* RESTful API architecture
* Responsive React frontend

## 🛠️ Tech Stack

### Frontend

* React
* React Router
* Axios
* Vite

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcrypt
* cookie-parser
* CORS

### Deployment

* **Frontend:** Vercel
* **Backend:** Render
* **Database:** MongoDB Atlas

## 🏗️ Architecture

```text
React + Vite
     │
     │ Axios + HTTP-only JWT Cookie
     ▼
Node.js + Express API
     │
     │ Mongoose
     ▼
MongoDB Atlas
```

The frontend communicates with the Express REST API, while authentication is handled using JWT tokens stored in HTTP-only cookies.

## 🔐 Authentication

DevTrack uses JWT-based authentication with HTTP-only cookies.

* Passwords are hashed using bcrypt before storage.
* JWT tokens are generated after successful authentication.
* Tokens are stored in HTTP-only cookies.
* Protected API routes identify the authenticated user from the JWT.
* Problem and project data is associated with the authenticated user's ID.

## 📋 API Endpoints

### Authentication

| Method | Endpoint             | Description            |
| ------ | -------------------- | ---------------------- |
| POST   | `/api/auth/register` | Register a new user    |
| POST   | `/api/auth/login`    | Login                  |
| GET    | `/api/auth/me`       | Get authenticated user |
| POST   | `/api/auth/logout`   | Logout                 |

### Problems

| Method | Endpoint            | Description         |
| ------ | ------------------- | ------------------- |
| GET    | `/api/problems`     | Get user's problems |
| POST   | `/api/problems`     | Create a problem    |
| PUT    | `/api/problems/:id` | Update a problem    |
| DELETE | `/api/problems/:id` | Delete a problem    |

### Projects

| Method | Endpoint            | Description         |
| ------ | ------------------- | ------------------- |
| GET    | `/api/projects`     | Get user's projects |
| POST   | `/api/projects`     | Create a project    |
| PUT    | `/api/projects/:id` | Update a project    |
| DELETE | `/api/projects/:id` | Delete a project    |

### Dashboard

| Method | Endpoint         | Description                  |
| ------ | ---------------- | ---------------------------- |
| GET    | `/api/dashboard` | Get user progress statistics |

## 💻 Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/Mohit-1711/DevTrack.git
cd DevTrack
```

### 2. Configure environment variables

Create `server/.env` from the example file:

```bash
cp server/.env.example server/.env
```

Configure:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

### 3. Install dependencies

```bash
npm install
npm run install:all
```

### 4. Start the development environment

```bash
npm run dev
```

The application will be available at:

* Frontend: `http://localhost:5173`
* Backend: `http://localhost:5000`

## 🌐 Production Deployment

DevTrack is deployed using:

```text
Frontend  → Vercel
Backend   → Render
Database  → MongoDB Atlas
```

Production environment variables are configured separately on Vercel and Render. Secrets are not committed to the repository.

## 🔒 Security

* Passwords are never stored in plain text.
* JWT authentication uses HTTP-only cookies.
* Protected routes require authentication.
* User data is scoped to the authenticated user's ID.
* Environment secrets are stored outside the Git repository.

## 📌 Project Status

DevTrack is a deployed full-stack MERN application with working authentication, database integration, REST APIs, and production hosting.
