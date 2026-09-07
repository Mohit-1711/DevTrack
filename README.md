# DevTrack

A MERN full-stack developer productivity tracker. Users can register/login, manage coding problems and projects, and view progress statistics.

## Stack
- React + React Router
- Node.js + Express
- MongoDB + Mongoose
- JWT authentication with an HTTP-only cookie
- bcrypt password hashing
- Axios

## Local setup

### 1. Configure MongoDB
Copy `server/.env.example` to `server/.env` and set `MONGO_URI` and `JWT_SECRET`.

### 2. Install dependencies

```bash
npm install
npm run install:all
```

### 3. Run both apps

```bash
npm run dev
```

Frontend: http://localhost:5173
Backend: http://localhost:5000

## API

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `POST /api/auth/logout`
- `GET/POST /api/problems`
- `GET/PUT/DELETE /api/problems/:id`
- `GET/POST /api/projects`
- `PUT/DELETE /api/projects/:id`
- `GET /api/dashboard`

All problem/project routes are protected and filter by the authenticated user's ID.
