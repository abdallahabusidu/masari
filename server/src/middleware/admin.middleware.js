import { verifyAdminToken } from "../utils/token.js";
import { ApiError } from "../utils/ApiError.js";

// Gate for admin-panel writes. Reads the admin token from the `x-admin-token`
// header so it never collides with the student's Authorization access token.
export function requireAdmin(req, _res, next) {
  const token = req.headers["x-admin-token"];
  if (!token) return next(ApiError.unauthorized("Admin access required"));
  try {
    verifyAdminToken(token);
    next();
  } catch {
    next(ApiError.unauthorized("Invalid or expired admin token"));
  }
}
