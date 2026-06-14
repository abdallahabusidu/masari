import mongoose from "mongoose";

const subTaskSchema = new mongoose.Schema(
  { title: { type: String, required: true, trim: true }, done: { type: Boolean, default: false } },
  { _id: true }
);

const attachmentSchema = new mongoose.Schema(
  { name: { type: String, required: true }, url: { type: String, required: true } },
  { _id: true }
);

const taskSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    group: { type: mongoose.Schema.Types.ObjectId, ref: "Group", default: null, index: true },
    assignedTo: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    course: { type: String, default: "", trim: true },
    priority: { type: String, enum: ["high", "medium", "low"], default: "medium" },
    status: { type: String, enum: ["pending", "in_progress", "completed"], default: "pending" },
    deadline: { type: Date, required: true, index: true },
    subTasks: { type: [subTaskSchema], default: [] },
    attachments: { type: [attachmentSchema], default: [] },
    completedAt: { type: Date, default: null },
    archived: { type: Boolean, default: false, index: true },
    reminderSent: { type: Boolean, default: false },
  },
  { timestamps: true }
);

taskSchema.index({ owner: 1, deadline: 1 });
taskSchema.index({ group: 1, status: 1 });

taskSchema.methods.toJSON = function () {
  const obj = this.toObject();
  obj.id = obj._id;
  delete obj._id;
  delete obj.__v;
  return obj;
};

export const Task = mongoose.model("Task", taskSchema);
