import { Router } from "express";
import authRoutes from "./auth.routes.js";
import taskRoutes from "./task.routes.js";
import analyticsRoutes from "./analytics.routes.js";
import notificationRoutes from "./notification.routes.js";
import contentRoutes from "./content.routes.js";

const router = Router();

router.get("/health", (_req, res) =>
  res.json({ success: true, data: { service: "masari" }, message: "OK" })
);

router.use("/auth", authRoutes);
router.use("/tasks", taskRoutes);
router.use("/analytics", analyticsRoutes);
router.use("/notifications", notificationRoutes);
router.use("/content", contentRoutes);
// Groups + sockets land in a later phase.

export default router;
