import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  university: z.string().optional(),
  major: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(1, "Password is required"),
});

export const refreshSchema = z.object({
  refreshToken: z.string().min(10, "refreshToken is required"),
});

export const updateMeSchema = z.object({
  name: z.string().min(2).optional(),
  university: z.string().optional(),
  major: z.string().optional(),
  avatarUrl: z.string().url().or(z.literal("")).optional(),
  preferences: z
    .object({
      language: z.enum(["ar", "en"]).optional(),
      theme: z.enum(["light", "dark"]).optional(),
      timezone: z.string().optional(),
      emailReminders: z.boolean().optional(),
    })
    .optional(),
});

export const forgotPasswordSchema = z.object({ email: z.string().email() });

export const resetPasswordSchema = z.object({
  token: z.string().min(10),
  password: z.string().min(6),
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1),
  newPassword: z.string().min(6),
});
