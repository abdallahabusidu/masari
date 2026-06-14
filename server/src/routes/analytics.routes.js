import { Router } from "express";
import * as ctrl from "../controllers/analytics.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();
router.use(authMiddleware);

router.get("/progress", ctrl.progress);

export default router;
