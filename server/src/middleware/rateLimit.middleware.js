import rateLimit from "express-rate-limit";
import { env } from "../config/env.js";

// Generous global limiter.
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 600,
  standardHeaders: true,
  legacyHeaders: false,
  skip: () => env.isTest,
});

// Stricter limiter for auth endpoints (brute-force protection).
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  skip: () => env.isTest,
  message: { success: false, message: "Too many attempts, try again later" },
});
