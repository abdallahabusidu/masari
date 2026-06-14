import { z } from "zod";
import { RESOURCE_CATEGORIES } from "../models/resource.model.js";

export const adminLoginSchema = z.object({ password: z.string().min(1, "Password required") });

export const levelSchema = z.object({
  name: z.string().min(1, "Name required"),
  order: z.number().int().optional(),
});
export const levelUpdateSchema = levelSchema.partial();

export const subjectSchema = z.object({
  level: z.string().min(1, "Level required"),
  name: z.string().min(1, "Name required"),
  order: z.number().int().optional(),
});
export const subjectUpdateSchema = subjectSchema.partial();

export const resourceSchema = z.object({
  subject: z.string().min(1, "Subject required"),
  category: z.enum(RESOURCE_CATEGORIES),
  title: z.string().min(1, "Title required"),
  url: z.string().url("Invalid URL").or(z.literal("")).optional(),
  description: z.string().optional(),
});
export const resourceUpdateSchema = resourceSchema.partial();
