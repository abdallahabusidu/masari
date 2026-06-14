import { Router } from "express";
import * as ctrl from "../controllers/notification.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();
router.use(authMiddleware);

router.get("/", ctrl.list);
router.patch("/read-all", ctrl.markAllRead);
router.patch("/:id/read", ctrl.markRead);
router.delete("/:id", ctrl.remove);

export default router;
