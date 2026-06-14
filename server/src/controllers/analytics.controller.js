import * as analyticsService from "../services/analytics.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ok } from "../utils/response.js";

export const progress = asyncHandler(async (req, res) => {
  const data = await analyticsService.getProgress(req.userId);
  ok(res, data, "OK");
});
