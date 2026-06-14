import * as service from "../services/notification.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ok } from "../utils/response.js";
import { ApiError } from "../utils/ApiError.js";

export const list = asyncHandler(async (req, res) => {
  const data = await service.listForUser(req.userId);
  ok(res, data, "OK");
});

export const markAllRead = asyncHandler(async (req, res) => {
  await service.markAllRead(req.userId);
  ok(res, null, "All marked read");
});

export const markRead = asyncHandler(async (req, res) => {
  const n = await service.markRead(req.userId, req.params.id);
  if (!n) throw ApiError.notFound("Notification not found");
  ok(res, { notification: n }, "Marked read");
});

export const remove = asyncHandler(async (req, res) => {
  const n = await service.remove(req.userId, req.params.id);
  if (!n) throw ApiError.notFound("Notification not found");
  ok(res, null, "Deleted");
});
