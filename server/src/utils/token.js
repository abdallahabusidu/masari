import jwt from "jsonwebtoken";
import crypto from "crypto";
import { env } from "../config/env.js";

export function signAccessToken(userId) {
  return jwt.sign({ sub: String(userId), typ: "access" }, env.jwt.accessSecret, {
    expiresIn: env.jwt.accessTtl,
  });
}

export function signRefreshToken(userId) {
  // jti makes every refresh token unique (so rotation is observable even within
  // the same second) and supports per-token revocation.
  return jwt.sign(
    { sub: String(userId), typ: "refresh", jti: crypto.randomUUID() },
    env.jwt.refreshSecret,
    { expiresIn: env.jwt.refreshTtl }
  );
}

// SHA-256 the full token for storage/comparison. (bcrypt truncates at 72 bytes,
// and JWTs share an identical 72-byte prefix, so bcrypt can't distinguish them.)
export function hashToken(token) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

export function verifyAccessToken(token) {
  return jwt.verify(token, env.jwt.accessSecret);
}

export function verifyRefreshToken(token) {
  return jwt.verify(token, env.jwt.refreshSecret);
}

// Admin-panel token (shared-password gate).
export function signAdminToken() {
  return jwt.sign({ typ: "admin" }, env.jwt.accessSecret, { expiresIn: env.admin.tokenTtl });
}

export function verifyAdminToken(token) {
  const payload = jwt.verify(token, env.jwt.accessSecret);
  if (payload.typ !== "admin") throw new Error("Not an admin token");
  return payload;
}

// Short-lived token used for password-reset links.
export function signResetToken(userId) {
  return jwt.sign({ sub: String(userId), typ: "reset" }, env.jwt.accessSecret, {
    expiresIn: "30m",
  });
}

export function verifyResetToken(token) {
  const payload = jwt.verify(token, env.jwt.accessSecret);
  if (payload.typ !== "reset") throw new Error("Invalid reset token");
  return payload;
}
