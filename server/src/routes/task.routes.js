import { Router } from "express";
import * as ctrl from "../controllers/task.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";
import {
  createTaskSchema,
  updateTaskSchema,
  statusSchema,
  subTaskCreateSchema,
  subTaskToggleSchema,
  commentSchema,
  listQuerySchema,
} from "../validators/task.schema.js";

const router = Router();
router.use(authMiddleware);

router.get("/", validate(listQuerySchema, "query"), ctrl.list);
router.post("/", validate(createTaskSchema), ctrl.create);
router.get("/:id", ctrl.getOne);
router.patch("/:id", validate(updateTaskSchema), ctrl.update);
router.patch("/:id/status", validate(statusSchema), ctrl.setStatus);
router.delete("/:id", ctrl.archive);
router.post("/:id/restore", ctrl.restore);

router.post("/:id/subtasks", validate(subTaskCreateSchema), ctrl.addSubTask);
router.patch("/:id/subtasks/:sIdx", validate(subTaskToggleSchema), ctrl.toggleSubTask);

router.get("/:id/comments", ctrl.listComments);
router.post("/:id/comments", validate(commentSchema), ctrl.addComment);

export default router;
