import "dotenv/config";

// Backward-compat: the original .env used a single JWT_SECRET. Fall back to it
// for both access and refresh secrets if the dedicated vars aren't set.
const legacySecret = process.env.JWT_SECRET || "masari-dev-secret-change-me";

export const env = {
  port: Number(process.env.PORT || 5050),
  mongoUri: process.env.MONGO_URI || "mongodb://127.0.0.1:27017/masari",
  clientOrigin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
  isProd: process.env.NODE_ENV === "production",
  isTest: process.env.NODE_ENV === "test",

  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET || legacySecret,
    refreshSecret: process.env.JWT_REFRESH_SECRET || `${legacySecret}-refresh`,
    accessTtl: process.env.JWT_ACCESS_TTL || "15m",
    refreshTtl: process.env.JWT_REFRESH_TTL || "7d",
  },

  smtp: {
    host: process.env.SMTP_HOST || "",
    port: Number(process.env.SMTP_PORT || 587),
    user: process.env.SMTP_USER || "",
    pass: process.env.SMTP_PASS || "",
    from: process.env.MAIL_FROM || "Masari <no-reply@masari.app>",
  },

  reminder: {
    cron: process.env.REMINDER_CRON || "*/15 * * * *",
    lookaheadHours: Number(process.env.REMINDER_LOOKAHEAD_HOURS || 24),
  },

  admin: {
    password: process.env.ADMIN_PASSWORD || "admin123",
    tokenTtl: process.env.ADMIN_TOKEN_TTL || "2h",
  },
};
