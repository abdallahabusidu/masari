import * as content from "../services/content.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ok, created } from "../utils/response.js";
import { signAdminToken } from "../utils/token.js";
import { env } from "../config/env.js";
import { ApiError } from "../utils/ApiError.js";

// ---- admin login ----
export const adminLogin = asyncHandler(async (req, res) => {
  if (req.body.password !== env.admin.password) throw ApiError.unauthorized("كلمة مرور غير صحيحة");
  ok(res, { adminToken: signAdminToken() }, "Admin authenticated");
});

// ---- levels ----
export const listLevels = asyncHandler(async (_req, res) => ok(res, { levels: await content.listLevels() }));
export const createLevel = asyncHandler(async (req, res) => created(res, { level: await content.createLevel(req.body) }));
export const updateLevel = asyncHandler(async (req, res) => ok(res, { level: await content.updateLevel(req.params.id, req.body) }));
export const deleteLevel = asyncHandler(async (req, res) => { await content.deleteLevel(req.params.id); ok(res, null, "Deleted"); });

// ---- subjects ----
export const listSubjects = asyncHandler(async (req, res) => ok(res, { subjects: await content.listSubjects(req.params.id) }));
export const createSubject = asyncHandler(async (req, res) => created(res, { subject: await content.createSubject(req.body) }));
export const updateSubject = asyncHandler(async (req, res) => ok(res, { subject: await content.updateSubject(req.params.id, req.body) }));
export const deleteSubject = asyncHandler(async (req, res) => { await content.deleteSubject(req.params.id); ok(res, null, "Deleted"); });

// ---- resources ----
export const listResources = asyncHandler(async (req, res) => ok(res, { resources: await content.listResources(req.params.id) }));
export const createResource = asyncHandler(async (req, res) => created(res, { resource: await content.createResource(req.body) }));
export const updateResource = asyncHandler(async (req, res) => ok(res, { resource: await content.updateResource(req.params.id, req.body) }));
export const deleteResource = asyncHandler(async (req, res) => { await content.deleteResource(req.params.id); ok(res, null, "Deleted"); });
