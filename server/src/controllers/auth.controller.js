import * as authService from "../services/auth.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ok, created } from "../utils/response.js";

export const register = asyncHandler(async (req, res) => {
  const { user, accessToken, refreshToken } = await authService.register(req.body);
  created(res, { user, accessToken, refreshToken }, "Account created");
});

export const login = asyncHandler(async (req, res) => {
  const { user, accessToken, refreshToken } = await authService.login(req.body);
  ok(res, { user, accessToken, refreshToken }, "Logged in");
});

export const refresh = asyncHandler(async (req, res) => {
  const { user, accessToken, refreshToken } = await authService.refresh(req.body);
  ok(res, { user, accessToken, refreshToken }, "Token refreshed");
});

export const logout = asyncHandler(async (req, res) => {
  await authService.logout(req.userId);
  ok(res, null, "Logged out");
});

export const me = asyncHandler(async (req, res) => {
  const user = await authService.getMe(req.userId);
  ok(res, { user }, "OK");
});

export const updateMe = asyncHandler(async (req, res) => {
  const user = await authService.updateMe(req.userId, req.body);
  ok(res, { user }, "Profile updated");
});

export const changePassword = asyncHandler(async (req, res) => {
  await authService.changePassword(req.userId, req.body);
  ok(res, null, "Password changed");
});

export const forgotPassword = asyncHandler(async (req, res) => {
  await authService.forgotPassword(req.body);
  ok(res, null, "If the email exists, a reset link was sent");
});

export const resetPassword = asyncHandler(async (req, res) => {
  await authService.resetPassword(req.body);
  ok(res, null, "Password reset successful");
});
