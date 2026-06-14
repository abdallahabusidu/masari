import { Router } from "express";
import * as ctrl from "../controllers/content.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { requireAdmin } from "../middleware/admin.middleware.js";
import { validate } from "../middleware/validate.middleware.js";
import { authLimiter } from "../middleware/rateLimit.middleware.js";
import {
  adminLoginSchema,
  levelSchema,
  levelUpdateSchema,
  subjectSchema,
  subjectUpdateSchema,
  resourceSchema,
  resourceUpdateSchema,
} from "../validators/content.schema.js";

const router = Router();

// Admin password gate -> returns a short-lived admin token.
router.post("/admin/login", authLimiter, validate(adminLoginSchema), ctrl.adminLogin);

// Reads: any authenticated student. Writes: admin token required.
router.get("/levels", authMiddleware, ctrl.listLevels);
router.post("/levels", requireAdmin, validate(levelSchema), ctrl.createLevel);
router.patch("/levels/:id", requireAdmin, validate(levelUpdateSchema), ctrl.updateLevel);
router.delete("/levels/:id", requireAdmin, ctrl.deleteLevel);

router.get("/levels/:id/subjects", authMiddleware, ctrl.listSubjects);
router.post("/subjects", requireAdmin, validate(subjectSchema), ctrl.createSubject);
router.patch("/subjects/:id", requireAdmin, validate(subjectUpdateSchema), ctrl.updateSubject);
router.delete("/subjects/:id", requireAdmin, ctrl.deleteSubject);

router.get("/subjects/:id/resources", authMiddleware, ctrl.listResources);
router.post("/resources", requireAdmin, validate(resourceSchema), ctrl.createResource);
router.patch("/resources/:id", requireAdmin, validate(resourceUpdateSchema), ctrl.updateResource);
router.delete("/resources/:id", requireAdmin, ctrl.deleteResource);

export default router;
