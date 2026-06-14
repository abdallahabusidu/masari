import mongoose from "mongoose";

const preferencesSchema = new mongoose.Schema(
  {
    language: { type: String, enum: ["ar", "en"], default: "en" },
    theme: { type: String, enum: ["light", "dark"], default: "light" },
    timezone: { type: String, default: "Asia/Gaza" },
    emailReminders: { type: Boolean, default: true },
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    passwordHash: { type: String, required: true, select: false },
    university: { type: String, default: "Al-Azhar University - Gaza" },
    major: { type: String, default: "" },
    avatarUrl: { type: String, default: "" },
    preferences: { type: preferencesSchema, default: () => ({}) },
    refreshTokenHash: { type: String, default: null, select: false },
  },
  { timestamps: true }
);

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  obj.id = obj._id;
  delete obj._id;
  delete obj.__v;
  delete obj.passwordHash;
  delete obj.refreshTokenHash;
  return obj;
};

export const User = mongoose.model("User", userSchema);
