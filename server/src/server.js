import http from "http";
import cron from "node-cron";
import { createApp } from "./app.js";
import { connectDB } from "./config/db.js";
import { env } from "./config/env.js";
import { logger } from "./config/logger.js";
import { generateForAll } from "./services/notification.service.js";

async function bootstrap() {
  await connectDB();

  const app = createApp();
  const server = http.createServer(app);

  // Deadline reminder engine (node-cron). Socket.io lands in a later phase.
  cron.schedule(env.reminder.cron, () => {
    generateForAll().catch((e) => logger.error("reminder cron failed:", e.message));
  });
  generateForAll().catch(() => {});

  server.listen(env.port, () => logger.info(`API listening on :${env.port}`));
  return server;
}

bootstrap().catch((err) => {
  logger.error("Failed to start server:", err.message);
  process.exit(1);
});
