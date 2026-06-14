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

## Deployment (Vercel + Render + Atlas)

**Backend → Render** (`server/`)
- Root directory: `server`, build: `npm install`, start: `npm start` (Render injects `PORT`).
- Env vars: `MONGO_URI`, `JWT_ACCESS_SECRET`, `JWT_REFRESH_SECRET`, `ADMIN_PASSWORD`, and
  `CLIENT_ORIGIN` = your local + Vercel origins, comma-separated, e.g.
  `http://localhost:5173,https://your-app.vercel.app`.
- Free tier spins down when idle; the first request after idle can take ~30–50s (cold start).

**Frontend → Vercel** (`client/`)
- Root directory: `client` (a `vercel.json` adds SPA rewrites; framework auto-detected as Vite).
- Env var: `VITE_API_URL` = `https://<your-render-app>.onrender.com/api`
  (and `VITE_SOCKET_URL` = the Render origin, for future real-time).
- After deploy, add the Vercel domain to the backend's `CLIENT_ORIGIN`.

**Database → MongoDB Atlas** — set `MONGO_URI`; run `npm run seed` once to load demo data.

### Local dev pointing at a remote backend
`client/.env` with `VITE_API_URL=https://<app>.onrender.com/api` makes `npm run dev` call the
remote API directly (the Vite proxy is only used when `VITE_API_URL` is unset). Restart the dev
server after changing `.env`.
