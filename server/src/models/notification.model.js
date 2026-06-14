import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    type: {
      type: String,
      enum: ["deadline", "overdue", "assignment", "group_invite", "comment", "system"],
      default: "system",
    },
    title: { type: String, default: "" },
    message: { type: String, required: true },
    link: { type: String, default: "" },
    read: { type: Boolean, default: false },
    // Dedupe key so the same reminder isn't created twice (e.g. "deadline:<taskId>").
    key: { type: String, default: null },
  },
  { timestamps: true }
);

notificationSchema.index({ user: 1, key: 1 }, { unique: true, sparse: true });
notificationSchema.index({ user: 1, read: 1, createdAt: -1 });

notificationSchema.methods.toJSON = function () {
  const obj = this.toObject();
  obj.id = obj._id;
  delete obj._id;
  delete obj.__v;
  return obj;
};

export const Notification = mongoose.model("Notification", notificationSchema);
