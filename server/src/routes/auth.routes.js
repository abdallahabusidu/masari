import { Router } from "express";
import * as ctrl from "../controllers/auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";
import { authLimiter } from "../middleware/rateLimit.middleware.js";
import {
  registerSchema,
  loginSchema,
  refreshSchema,
  updateMeSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  changePasswordSchema,
} from "../validators/auth.schema.js";

const router = Router();

router.post("/register", authLimiter, validate(registerSchema), ctrl.register);
router.post("/login", authLimiter, validate(loginSchema), ctrl.login);
router.post("/refresh", validate(refreshSchema), ctrl.refresh);
router.post("/forgot-password", authLimiter, validate(forgotPasswordSchema), ctrl.forgotPassword);
router.post("/reset-password", authLimiter, validate(resetPasswordSchema), ctrl.resetPassword);

router.post("/logout", authMiddleware, ctrl.logout);
router.get("/me", authMiddleware, ctrl.me);
router.patch("/me", authMiddleware, validate(updateMeSchema), ctrl.updateMe);
router.post("/change-password", authMiddleware, validate(changePasswordSchema), ctrl.changePassword);

export default router;
