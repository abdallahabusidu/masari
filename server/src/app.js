import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import mongoSanitize from "express-mongo-sanitize";

import { env } from "./config/env.js";
import routes from "./routes/index.js";
import { apiLimiter } from "./middleware/rateLimit.middleware.js";
import { notFoundHandler, errorHandler } from "./middleware/error.middleware.js";

export function createApp() {
  const app = express();

  // Render/Vercel/Heroku sit behind a reverse proxy. Trust the first proxy hop so
  // express-rate-limit can read the real client IP from X-Forwarded-For.
  app.set("trust proxy", 1);

  // CLIENT_ORIGIN may be a comma-separated list (e.g. localhost + Vercel domain).
  const allowedOrigins = env.clientOrigin.split(",").map((s) => s.trim()).filter(Boolean);
  app.use(helmet());
  app.use(
    cors({
      origin(origin, cb) {
        // allow same-origin/non-browser (no Origin header) and any whitelisted origin
        if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
        cb(new Error(`Origin ${origin} not allowed by CORS`));
      },
      credentials: true,
    })
  );
  app.use(express.json({ limit: "1mb" }));
  app.use(mongoSanitize());
  if (!env.isTest) app.use(morgan("dev"));
  app.use("/api", apiLimiter);

  app.use("/api", routes);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
