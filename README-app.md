# Masari — Student Task Management System (MVP)

Full-stack implementation of the Masari platform described in `req.docx`.

- **client/** — React 18 + Vite (RTL Arabic), React Router, Axios, FullCalendar, Recharts. Styling reuses the original prototype's CSS (ported to `client/src/styles/legacy.css`) so the UI matches the native design exactly.
- **server/** — Node.js + Express + MongoDB (Mongoose), JWT auth, bcrypt, Zod validation

## MVP scope

Auth (register/login/JWT) · Task CRUD with filters & subtasks · Dashboard · Academic Calendar ·
Analytics charts · Profile/preferences.

**Deferred** (stubs left in place): collaborative groups, Socket.io real-time sync, email/notification engine.

## Prerequisites

- Node.js 18+
- MongoDB — either:
  - **Local:** `brew install mongodb-community && brew services start mongodb-community`, or
  - **Cloud (matches the report):** a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster — paste its connection string into `server/.env` as `MONGO_URI`.

## Run

```bash
# 1. Backend
cd server
cp .env.example .env          # set JWT_SECRET and MONGO_URI
npm install
npm run seed                  # creates demo student + sample tasks
npm run dev                   # http://localhost:5000

# 2. Frontend (new terminal)
cd client
npm install
npm run dev                   # http://localhost:5173
```

Vite proxies `/api` → `http://localhost:5000`.

**Demo login:** `student@masari.edu` / `masari123`

## API summary

| Method | Endpoint | Notes |
|--------|----------|-------|
| POST | `/api/auth/register` | returns `{ token, user }` |
| POST | `/api/auth/login` | returns `{ token, user }` |
| GET  | `/api/auth/student-profile` | auth required |
| PATCH| `/api/auth/profile` | update name/major/preferences |
| GET  | `/api/tasks` | filters: `priority,course,status,dueDate,search` |
| POST | `/api/tasks` | create |
| PATCH| `/api/tasks/:id` | edit / reschedule |
| PATCH| `/api/tasks/:id/status` | toggle complete |
| DELETE | `/api/tasks/:id` | delete |
| GET  | `/api/analytics/progress` | summary, per-course, weekly trend |

All task routes are owner-scoped: a student can never read or edit another student's tasks.
