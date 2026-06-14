import bcrypt from "bcryptjs";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
  signResetToken,
  verifyResetToken,
  hashToken,
} from "../utils/token.js";
import { sendMail } from "../config/mailer.js";
import { env } from "../config/env.js";

async function issueTokens(user) {
  const accessToken = signAccessToken(user._id);
  const refreshToken = signRefreshToken(user._id);
  user.refreshTokenHash = hashToken(refreshToken);
  await user.save();
  return { accessToken, refreshToken };
}

export async function register({ name, email, password, university, major }) {
  const exists = await User.findOne({ email });
  if (exists) throw ApiError.conflict("Email already registered");

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, passwordHash, university, major });
  const tokens = await issueTokens(user);
  return { user, ...tokens };
}

export async function login({ email, password }) {
  const user = await User.findOne({ email }).select("+passwordHash");
  if (!user) throw ApiError.unauthorized("Invalid credentials");

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) throw ApiError.unauthorized("Invalid credentials");

  const tokens = await issueTokens(user);
  return { user, ...tokens };
}

export async function refresh({ refreshToken }) {
  let payload;
  try {
    payload = verifyRefreshToken(refreshToken);
  } catch {
    throw ApiError.unauthorized("Invalid refresh token");
  }

  const user = await User.findById(payload.sub).select("+refreshTokenHash");
  if (!user || !user.refreshTokenHash) throw ApiError.unauthorized("Session expired");

  if (hashToken(refreshToken) !== user.refreshTokenHash) {
    throw ApiError.unauthorized("Session expired");
  }

  // Rotate the refresh token on every use.
  const tokens = await issueTokens(user);
  return { user, ...tokens };
}

export async function logout(userId) {
  await User.findByIdAndUpdate(userId, { refreshTokenHash: null });
}

export async function getMe(userId) {
  const user = await User.findById(userId);
  if (!user) throw ApiError.notFound("User not found");
  return user;
}

export async function updateMe(userId, updates) {
  const user = await User.findById(userId);
  if (!user) throw ApiError.notFound("User not found");

  const { preferences, ...rest } = updates;
  Object.assign(user, rest);
  if (preferences) user.preferences = { ...user.preferences.toObject(), ...preferences };
  await user.save();
  return user;
}

export async function changePassword(userId, { currentPassword, newPassword }) {
  const user = await User.findById(userId).select("+passwordHash");
  if (!user) throw ApiError.notFound("User not found");
  const valid = await bcrypt.compare(currentPassword, user.passwordHash);
  if (!valid) throw ApiError.badRequest("Current password is incorrect");
  user.passwordHash = await bcrypt.hash(newPassword, 10);
  await user.save();
}

export async function forgotPassword({ email }) {
  const user = await User.findOne({ email });
  // Always return success to avoid leaking which emails exist.
  if (!user) return;

  const token = signResetToken(user._id);
  const link = `${env.clientOrigin}/reset-password?token=${token}`;
  await sendMail({
    to: email,
    subject: "Masari - إعادة تعيين كلمة المرور",
    text: `لإعادة تعيين كلمة المرور افتح الرابط: ${link}`,
    html: `<p>لإعادة تعيين كلمة المرور اضغط <a href="${link}">هنا</a> (صالح لمدة 30 دقيقة).</p>`,
  });
  return token; // returned only so tests can assert; controller does not expose it
}

export async function resetPassword({ token, password }) {
  let payload;
  try {
    payload = verifyResetToken(token);
  } catch {
    throw ApiError.badRequest("Invalid or expired reset token");
  }
  const user = await User.findById(payload.sub).select("+passwordHash");
  if (!user) throw ApiError.notFound("User not found");
  user.passwordHash = await bcrypt.hash(password, 10);
  user.refreshTokenHash = null; // force re-login everywhere
  await user.save();
}
