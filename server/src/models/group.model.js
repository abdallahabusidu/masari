import mongoose from "mongoose";
import crypto from "crypto";

const memberSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    role: { type: String, enum: ["leader", "contributor"], default: "contributor" },
  },
  { _id: false }
);

const groupSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    members: { type: [memberSchema], default: [] },
    inviteCode: { type: String, unique: true, index: true },
  },
  { timestamps: true }
);

groupSchema.statics.generateInviteCode = () =>
  crypto.randomBytes(4).toString("hex").toUpperCase();

groupSchema.methods.toJSON = function () {
  const obj = this.toObject();
  obj.id = obj._id;
  delete obj._id;
  delete obj.__v;
  return obj;
};

export const Group = mongoose.model("Group", groupSchema);
