import mongoose from "mongoose";

// Resource categories shown under each subject.
export const RESOURCE_CATEGORIES = ["lectures", "recorded", "materials", "books"];

const resourceSchema = new mongoose.Schema(
  {
    subject: { type: mongoose.Schema.Types.ObjectId, ref: "Subject", required: true, index: true },
    category: { type: String, enum: RESOURCE_CATEGORIES, required: true },
    title: { type: String, required: true, trim: true },
    url: { type: String, default: "" },
    description: { type: String, default: "" },
  },
  { timestamps: true }
);

resourceSchema.methods.toJSON = function () {
  const o = this.toObject();
  o.id = o._id;
  delete o._id;
  delete o.__v;
  return o;
};

export const Resource = mongoose.model("Resource", resourceSchema);
