import { z } from "zod";

const priority = z.enum(["high", "medium", "low"]);
const status = z.enum(["pending", "in_progress", "completed"]);

export const createTaskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  course: z.string().optional(),
  priority: priority.optional(),
  status: status.optional(),
  deadline: z.coerce.date({ invalid_type_error: "Invalid deadline" }),
  group: z.string().optional(),
  assignedTo: z.array(z.string()).optional(),
  subTasks: z.array(z.object({ title: z.string().min(1), done: z.boolean().optional() })).optional(),
});

export const updateTaskSchema = createTaskSchema.partial();

export const statusSchema = z.object({ status });

export const subTaskCreateSchema = z.object({ title: z.string().min(1) });
export const subTaskToggleSchema = z.object({ done: z.boolean().optional() });

export const commentSchema = z.object({ body: z.string().min(1, "Comment cannot be empty") });

export const listQuerySchema = z.object({
  priority: priority.optional(),
  status: status.optional(),
  course: z.string().optional(),
  group: z.string().optional(),
  search: z.string().optional(),
  from: z.coerce.date().optional(),
  to: z.coerce.date().optional(),
  archived: z.enum(["true", "false"]).optional(),
  sort: z.enum(["deadline", "priority", "created", "-created"]).optional(),
  page: z.coerce.number().int().min(1).optional(),
  limit: z.coerce.number().int().min(1).max(100).optional(),
});
