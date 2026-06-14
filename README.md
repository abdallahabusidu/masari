# Masari — Student Task Management System

Graduation project for Al-Azhar University. A full-stack platform that helps students
manage academic tasks, deadlines, group projects, and productivity analytics.

## Monorepo layout

```
masari/
├── client/   # React 18 (Vite) SPA — Tailwind, React Query, RHF+Zod, i18next, socket.io-client
├── server/   # Node 20 + Express API — MongoDB/Mongoose, JWT, socket.io, node-cron, nodemailer
├── docker-compose.yml
└── .github/workflows/ci.yml
```

Server follows strict layering: `routes → controllers → services → models`, with
`validators/`, `middleware/`, `sockets/`, `jobs/`, `utils/`, `config/`.

## Quick start

```bash
# 1. MongoDB — local (brew/docker) or a MongoDB Atlas connection string.
docker compose up -d mongo        # optional: starts Mongo on :27017

# 2. Backend
cd server
cp .env.example .env              # set MONGO_URI + JWT secrets
npm install
npm run seed                      # demo student + sample tasks
npm run dev                       # http://localhost:5050

# 3. Frontend
cd ../client
cp .env.example .env              # set VITE_API_URL / VITE_SOCKET_URL
npm install
npm run dev                       # http://localhost:5173
```

Demo login: `student@masari.edu` / `masari123`

## Scripts

| Location | Command | Purpose |
| --- | --- | --- |
| server | `npm run dev` | start API with watch |
| server | `npm test` | Jest + Supertest (in-memory Mongo) |
| server | `npm run seed` | seed demo data |
| client | `npm run dev` | start Vite dev server |
| client | `npm run build` | production build |
| client | `npm test` | Vitest + RTL |

## Environment variables

**server:** `PORT`, `MONGO_URI`, `CLIENT_ORIGIN`, `JWT_ACCESS_SECRET`, `JWT_REFRESH_SECRET`,
`JWT_ACCESS_TTL`, `JWT_REFRESH_TTL`, `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`,
`MAIL_FROM`, `REMINDER_CRON`, `REMINDER_LOOKAHEAD_HOURS`

**client:** `VITE_API_URL`, `VITE_SOCKET_URL`

## Deployment

- **Frontend** → Vercel (build `client/`, set `VITE_API_URL`/`VITE_SOCKET_URL`).
- **Backend** → Render/Heroku (deploy `server/`, set env vars).
- **Database** → MongoDB Atlas (set `MONGO_URI`).

## Build status

This project is being built in phases (see the build contract). Current: **Phase 1 — Auth** complete.
